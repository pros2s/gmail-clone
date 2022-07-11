import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
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
  const [ isStarred, setIsStarred ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ isDeleted, setIsDeleted ] = useState(false);
  const [ isSpamed, setIsSpamed ] = useState(false);

  useEffect(() => {
    setDate();
  }, []);

  const setDate = () => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  };

  const onClickCheck = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    !isChecked
      ? dispatch(addChoosed(id))
      : dispatch(removeById(id));

    setIsChecked((state) => !state);
  };

  const onClickStar = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    isStarred
      ? setFolderNames((state) => state.filter((elem) => elem !== 'Marked'))
      : setFolderNames((state) => [ ...state, 'Marked']);

    setIsStarred((state) => !state);
  };

  const onClickDelete = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    folder !== 'Deleted' && setFolderNames((state) => [ ...state, 'Deleted'].filter((folder) => folder === 'Deleted'));
  };

  const onClickSpam = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    folder !== 'Spam' && setFolderNames((state) => [ ...state, 'Spam'].filter((folder) => folder === 'Spam'));
  };

  const onClickBack = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    setFolderNames((state) => [ ...state, 'Inbox'].filter((folder) => folder !== 'Deleted' && folder !== 'Spam'));
  };

  const starClass = classNames({
    'message__star': true,
    'active': isStarred
  })

  const checkClass = classNames({
    'message__check': true,
    'active': isChecked
  })


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
                className={ checkClass }
                onClick={ (e) => onClickCheck(e) } />
              <RiBookmark3Fill
                title='mark'
                className={ starClass }
                onClick={ (e) => onClickStar(e) } />
            </div>

            <p className='message__name'>{ name }</p>
            <p className='message__preview'>{ company.name }</p>
            <p className='message__date'>{ randDate }</p>
            <div className="message__tools-right">
              {
                folder === 'Deleted' || folder === 'Spam' ?
                <RiArrowGoBackFill onClick={ (e) => onClickBack(e) } /> :
                <>
                  <RiDeleteBinFill title='delete' onClick={ (e) => onClickDelete(e) } />
                  <RiSpamFill title='spam' onClick={ (e) => onClickSpam(e) } />
                </>
              }
            </div>
        </div>
      }
    </>
  );
};


export default Message;
