import React, { FC, useEffect, useState } from 'react';
import { randomDate } from '../redux/slices/ActionCreatores';

import { IMessage } from '../types/message';


interface IMessageProps {
  message: IMessage
};

const Message: FC<IMessageProps> = ({ message }) => {
  const [ randDate, setRandDate ] = useState('');

  useEffect(() => {
    setDate();
  }, []);


  const setDate = () => {
    setRandDate(randomDate('02/13/2022', '01/01/2000'));
    // setRandDate(randomDate());
  };


  return (
    <div style={{ display: 'flex' }}>
      <p>{ message.name }</p>
      <p>{ message.company.name }</p>
      <p>{ randDate }</p>
    </div>
  );
};


export default Message;
