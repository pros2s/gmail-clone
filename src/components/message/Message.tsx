import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { randomDate } from '../../redux/slices/ActionCreators';
import { IMessage } from '../../types/message';
import './message.scss';
import ToolsRight from './tools-right/toolsRight/ToolsRight';
import ToolsLeft from './tools-left/ToolsLeft';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, company, id } = message;

  const { folder } = useParams();
  const route = useNavigate();

  const [ folderNames, setFolderNames ] = useState<string[]>([ 'Inbox' ]);
  const [ randDate, setRandDate ] = useState<string>('');

  const [ isShowModal, setIsShowModal ] = useState<boolean>(false);
  const [ isChecked, setIsChecked ] = useState<boolean>(false);
  const [ isMarked, setIsMarked ] = useState<boolean>(false);
  const [ isMore, setIsMore ] = useState<boolean>(false);
  const [ isRead, setIsRead ] = useState<boolean>(false);


  useEffect(() => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  }, []);


  const onClickMessage = () => {
    setIsRead(true);
    route(`/mailclone/${ folder }/${ id }`);
  };

  const messageClassName = classNames({
    'message': true,
    'active': isMore,
    'notRead': !isRead
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
              setIsChecked={ setIsChecked }
              setIsMarked={ setIsMarked }
              folder={ folder }
              isChecked={ isChecked }
              isMarked={ isMarked }
              id={ id } />

            <p className='message__name'>{ name }</p>
            <p className='message__preview'>{ company.name }</p>
            <p className='message__date'>{ randDate }</p>

            <ToolsRight
              setFolderNames={ setFolderNames }
              setIsMore={ setIsMore }
              setIsShowModal={ setIsShowModal }
              setIsRead={ setIsRead }
              folder={ folder }
              setIsChecked={ setIsChecked }
              setIsMarked={ setIsMarked }
              isMore={ isMore }
              isShowModal={ isShowModal } />

        </div>
      }
    </>
  );
};


export default Message;
