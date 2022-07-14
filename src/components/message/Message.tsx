import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { randomDate } from '../../redux/slices/ActionCreators';
import { IFolders, IMessage } from '../../types/message';
import './message.scss';
import ToolsRight from './tools-right/toolsRight/ToolsRight';
import ToolsLeft from './tools-left/ToolsLeft';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addSelected, removeSeletedById } from '../../redux/slices/selectedMessages';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, username, id } = message;
  const dispatch = useAppDispatch();
  const { content } = useAppSelector((state) => state.messageInfoReducer);
  const { selectedAll } = useAppSelector((state) => state.selectedAllRducer);

  const { folder } = useParams();
  const route = useNavigate();

  const [ folderNames, setFolderNames ] = useState<string[]>([ 'Inbox' ]);
  const [ randDate, setRandDate ] = useState<string>('');

  const [ isSelected, setIsSelected ] = useState<boolean>(false);
  const [ isMarked, setIsMarked ] = useState<boolean>(false);
  const [ isMore, setIsMore ] = useState<boolean>(false);
  const [ isRead, setIsRead ] = useState<boolean>(false);


  useEffect(() => {
    routeSentMessages();
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  }, []); // eslint-disable-line

  useEffect(() => {
    setIsSelected(false);
  }, [ folder ]);

  useEffect(() => {
    setIsSelected(selectedAll);
  }, [ selectedAll ]);

  useEffect(() => {
    const newSelected: IFolders = {
      folders: folderNames,
      id
    };

    isSelected ? dispatch(addSelected(newSelected)) : dispatch(removeSeletedById(id));
  }, [ isSelected ]);


  const routeSentMessages = () => {
    if (id.length > 1 && id !== '10') {
      setFolderNames((state) => [ ...state, 'Sent' ].filter((item) => item !== 'Inbox'));
      setIsRead(true);
    };
  };

  const onClickMessage = () => {
    setIsRead(true);
    route(`/mailclone/${ folder }/${ id }`);
  };

  const messageClassName = classNames({
    'message': true,
    'active': isMore,
    'notRead': !isRead,
    'selected': isSelected
  });


  return (
    <>
      {
        folder && folderNames.includes(folder) &&

        <div
          className={ messageClassName }
          onClick={ () => onClickMessage() }>

            <ToolsLeft
              setFolderNames={ setFolderNames }
              setIsSelected={ setIsSelected }
              setIsMarked={ setIsMarked }
              folder={ folder }
              folderNames={ folderNames }
              isSelected={ isSelected }
              isMarked={ isMarked }
              id={ id } />

            <p className='message__name'>{ username }</p>
            <p className='message__preview'>{ name }</p>
            <p className='message__date'>{ content?.date || randDate }</p>

            <ToolsRight
              setFolderNames={ setFolderNames }
              setIsMore={ setIsMore }
              setIsRead={ setIsRead }
              folderNames={ folderNames}
              folder={ folder }
              setIsSelected={ setIsSelected }
              setIsMarked={ setIsMarked }
              isMore={ isMore }
              messageId={ id }
              isRead={ isRead } />

        </div>
      }
    </>
  );
};


export default Message;
