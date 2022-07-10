import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { randomDate } from '../../redux/slices/ActionCreators';

import { IMessage } from '../../types/message';
import './message.scss';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, company, id } = message;

  const { folder } = useParams();
  const route = useNavigate();

  const [ folderNames, setFolderNames ] = useState([ 'Inbox' ]);
  const [ randDate, setRandDate ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {
    setDate();
  }, []);


  const setDate = () => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  };

  const onClickCheckbox = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    isChecked
      ? setFolderNames((state) => state.filter((elem) => elem !== 'Spam'))
      : setFolderNames((state) => [ ...state, 'Spam']);
      
    setIsChecked((state) => !state);
  };


  return (
    <>
      {
        folder && folderNames.includes(folder) &&
        <div
          className='message'
          onClick={ () => route(`/${ folder }/${ id }`)}>
            <input
              type="checkbox"
              checked={ isChecked }
              onChange={ (e) => onChangeCheckbox(e) }
              onClick={ (e) => onClickCheckbox(e) }/>
                <p className='message__name'>{ name }</p>
                <p className='message__preview'>{ company.name }</p>
                <p className='message__date'>{ randDate }</p>
        </div>
      }
    </>
  );
};


export default Message;
