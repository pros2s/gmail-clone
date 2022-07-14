import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { randomDate } from '../../redux/slices/ActionCreators';
import { IFolders, IMessage } from '../../types/message';
import ToolsRight from './tools-right/toolsRight/ToolsRight';
import ToolsLeft from './tools-left/ToolsLeft';

import { useAppSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addSelected, removeSeletedById } from '../../redux/slices/selectedMessages';
import { selectedAllFalse, selectedAllTrue } from '../../redux/slices/selectedMenu';

import './message.scss';

interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, username, id } = message;
  const dispatch = useAppDispatch();

  const { selectedAll, selectedType } = useAppSelector((state) => state.selectedMenuReducer);
  const { folderNamesArray } = useAppSelector((state) => state.selectedMessagesReducer);
  const { content } = useAppSelector((state) => state.messageInfoReducer);
  const { tools } = useAppSelector((state) => state.selectedToolsReducer);
  const { messages } = useAppSelector((state) => state.messagesReducer);

  const { folder } = useParams();
  const route = useNavigate();

  const [ folderNames, setFolderNames ] = useState<string[]>([ 'Inbox' ]);
  const [ isSelected, setIsSelected ] = useState<boolean>(false);
  const [ isMarked, setIsMarked ] = useState<boolean>(false);
  const [ isMore, setIsMore ] = useState<boolean>(false);
  const [ isRead, setIsRead ] = useState<boolean>(false);

  const [ randDate, setRandDate ] = useState<string>('');

  useEffect(() => {
    routeSentMessages();
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  }, []); // eslint-disable-line


  useEffect(() => {
    (isSelected && tools.includes('unread') && setIsRead(false)) ||
    (isSelected && tools.includes('read') && setIsRead(true)) ||
    (isSelected && tools.includes('marked') && setIsMarked(true)) ||
    (isSelected && tools.includes('unmarked') && setIsMarked(false)) ||
    (isSelected && tools.includes('delete') && deleteAndSpamTools('Deleted')) ||
    (isSelected && tools.includes('spam') && deleteAndSpamTools('Spam'));

    clearSelected();
  }, [ tools ]); // eslint-disable-line

  useEffect(() => {
    switch (selectedType) {
      case 'Read': setIsSelected(isRead); break;
      case 'Unread': setIsSelected(!isRead); break;
      case 'Marked': setIsSelected(isMarked); break;
      case 'Unmarked': setIsSelected(!isMarked); break;
      default: setIsSelected(selectedAll); break;
    };
  }, [ selectedType ]); // eslint-disable-line


  useEffect(() => {
    clearSelected();
  }, [ folder ]); // eslint-disable-line

  useEffect(() => {
    markChanges();
  }, [ isMarked ]); // eslint-disable-line

  useEffect(() => {
    folder && folderNames.includes(folder) && setIsSelected(selectedAll);
  }, [ selectedAll ]); // eslint-disable-line

  useEffect(() => {
    messages.length === folderNamesArray.length
      && dispatch(selectedAllTrue());
  }, [ folderNamesArray ]); // eslint-disable-line

  useEffect(() => {
    const newSelected: IFolders = {
      folders: folderNames,
      id
    };

    isSelected ? dispatch(addSelected(newSelected)) : dispatch(removeSeletedById(id));
  }, [ isSelected ]); // eslint-disable-line


  const clearSelected = () => {
    setIsSelected(false);
    dispatch(selectedAllFalse());
  };

  const deleteAndSpamTools = (deleteOrSpam: string) => {
    setFolderNames([]);
    setFolderNames((state) => [ ...state, deleteOrSpam ]);
  };

  const markChanges = () => {
    isMarked && !folderNames.includes('Deleted')
      ? setFolderNames((state) => [ ...state, 'Marked' ])
      : setFolderNames((state) => state.filter((name) => name !== 'Marked'));
  };

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
          onClick={ () => onClickMessage() }
          title={ username }
          tabIndex={ 1 }>

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
            {
              folder === 'Sent'
                ? <p className='message__date'>{ content?.date }</p>
                : <p className='message__date'>{ randDate }</p>
            }

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
