import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RiBookmark3Fill,
  RiDeleteBinFill,
  RiSpamFill,
  RiCheckboxCircleFill,
  RiArrowGoBackFill
} from 'react-icons/ri';

import { randomDate } from '../../redux/slices/ActionCreators';
import { IMessage } from '../../types/message';
import './message.scss';
import { addChoosed, removeById } from '../../redux/slices/chosenMessages';
import { useAppDispatch } from '../../hooks/useAppDispatch';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, company, id } = message;

  const dispatch = useAppDispatch();
  const { folder } = useParams();
  const route = useNavigate();

  const [ folderNames, setFolderNames ] = useState([ 'Inbox' ]);
  const [ randDate, setRandDate ] = useState('');
  const [ isMarked, setIsMarked ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {
    setDate();
  }, []);


  const setDate = () => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  };

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

  const onClickRightBtns = (e: MouseEvent<SVGElement>, folderName: string) => {
    e.stopPropagation();

    if (folderName === 'Inbox') {
      setFolderNames((state) => [ ...state, 'Inbox'].filter((folder) => folder !== 'Deleted' && folder !== 'Spam'));
    }
    else {
      folder !== folderName && setFolderNames((state) => [ ...state, folderName ].filter((folder) => folderName === folder));
    }
  };


  return (
    <>
      {
        folder && folderNames.includes(folder) &&
        <div
          className='message'
          onClick={ () => route(`/mailclone/${ folder }/${ id }`)}>
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
                folder === 'Deleted' || folder === 'Spam' ?
                <RiArrowGoBackFill onClick={ (e) => onClickRightBtns(e, 'Inbox') } /> :
                <>
                  <RiDeleteBinFill title='delete' onClick={ (e) => onClickRightBtns(e, 'Deleted') } />
                  <RiSpamFill title='spam' onClick={ (e) => onClickRightBtns(e, 'Spam') } />
                </>
              }
            </div>
        </div>
      }
    </>
  );
};


export default Message;
