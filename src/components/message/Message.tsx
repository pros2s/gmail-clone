import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  RiBookmark3Fill,
  RiDeleteBinFill,
  RiSpamFill,
  RiCheckboxCircleFill,
  RiArrowGoBackFill,
  RiMore2Fill,
  RiMailCheckLine,
  RiFolderSharedLine,
  RiFolder2Fill
} from 'react-icons/ri';

import { randomDate } from '../../redux/slices/ActionCreators';
import { IMessage } from '../../types/message';
import './message.scss';
import { addChoosed, removeById } from '../../redux/slices/chosenMessages';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, company, id } = message;
  
  const { folder } = useParams();
  const route = useNavigate();

  const dispatch = useAppDispatch();
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);

  const [ folderNames, setFolderNames ] = useState([ 'Inbox' ]);
  const [ randDate, setRandDate ] = useState('');

  const [ isMarked, setIsMarked ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ isMore, setIsMore ] = useState(false);
  const [ isRead, setIsRead ] = useState(false);
  const [ isShowModal, setIsShowModal ] = useState(false);

  useEffect(() => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  }, []);


  const onClickCheck = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    isChecked
      ? dispatch(removeById(id))
      : dispatch(addChoosed(id));

    setIsChecked((state) => !state);
  };

  const onClickMark = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    isMarked
      ? setFolderNames((state) => state.filter((elem) => elem !== 'Marked'))
      : setFolderNames((state) => [ ...state, 'Marked']);

    setIsMarked((state) => !state);
  };

  const onClickRightBtns = (e: MouseEvent<SVGElement | HTMLDivElement>, folderName: string) => {
    e.stopPropagation();

    if (folderName !== 'Deleted' && folderName !== 'Spam') {
      setFolderNames((state) => [ ...state, folderName ].filter((folder) => folder !== 'Deleted' && folder !== 'Spam'));
      setIsShowModal(false);
    }
    else {
      folder !== folderName && setFolderNames((state) => [ ...state, folderName ].filter((folder) => folderName === folder));
    }
  };

  const onClickMore = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsMore((state) => !state);
  };

  const markAsRead = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsRead(true);
    setIsMore(false);
  };

  const showFoldersMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    customFolders.length !== 0 && setIsShowModal((state) => !state);
  };

  const onLeaveRightTools = () => {
    setIsMore(false);
    setIsShowModal(false);
  };

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
            <div className="message__tools-left d-flex">
              <RiCheckboxCircleFill
                title='choose'
                className={ isChecked ? 'message__check active' : 'message__check' }
                onClick={ (e) => onClickCheck(e) } />
              <RiBookmark3Fill
                title='mark'
                className={ isMarked ? 'message__star active' : 'message__star' }
                onClick={ (e) => onClickMark(e) } />
            </div>

            <p className='message__name'>{ name }</p>
            <p className='message__preview'>{ company.name }</p>
            <p className='message__date'>{ randDate }</p>

            <div className="message__tools-right">
              {
                folder === 'Deleted' || folder === 'Spam'
                  ? <RiArrowGoBackFill onClick={ (e) => onClickRightBtns(e, 'Inbox') } />
                  :
                  <>
                    <RiDeleteBinFill style={{ marginRight: 3 }} title='delete' onClick={ (e) => onClickRightBtns(e, 'Deleted') } />
                    <RiSpamFill title='spam' onClick={ (e) => onClickRightBtns(e, 'Spam') } />

                    <div className="message__tools-right-more d-flex">
                      <RiMore2Fill
                        title='more'
                        onClick={ (e) => onClickMore(e) }/>
                      <div
                        className={ isMore ? 'message__tools-right-more-menu active' : 'message__tools-right-more-menu' }
                        onMouseLeave={ () => onLeaveRightTools() }>
                          <div className='message__tools-right-more-menu-choose'>
                            <div className='d-flex ai-center' onClick={ (e) => showFoldersMenu(e) }>
                              <p>add to</p>
                              <RiFolderSharedLine />
                            </div>

                            <div className='d-flex ai-center' onClick={ (e) => markAsRead(e) }>
                              <p>mark as read</p>
                              <RiMailCheckLine />
                            </div>
                          </div>

                          <div className={
                            isShowModal
                              ? 'message__tools-right-more-menu-folders active'
                              : 'message__tools-right-more-menu-folders' }>
                                {
                                  customFolders.map((folder) => (
                                    <div key={ folder } className='d-flex ai-center' onClick={ (e) => onClickRightBtns(e, folder) }>
                                      <RiFolder2Fill />
                                      <p>{ folder }</p>
                                    </div>
                                  ))
                                }
                          </div>
                      </div>
                    </div>
                  </>
              }
            </div>
        </div>
      }
    </>
  );
};


export default Message;
