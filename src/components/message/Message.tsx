import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { randomDate } from '../../redux/slices/ActionCreators';

import { IMessage } from '../../types/message';
import './message.scss';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const { name, company, id } = message;
  const route = useNavigate();
  const [ randDate, setRandDate ] = useState('');

  useEffect(() => {
    setDate();
  }, []);


  const setDate = () => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  };


  return (
    <div className='message' onClick={ () => route(`/Inbox/${ id }`)}>
      <p className='message__name'>{ name }</p>
      <p className='message__preview'>{ company.name }</p>
      <p className='message__date'>{ randDate }</p>
    </div>
  );
};


export default Message;
