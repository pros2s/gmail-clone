import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { message } from '../types/message';


interface IMessage {
  message: message
};

const Message: FC<IMessage> = ({ message }) => {
  const { sender, summary, sentDateInGMT, messageId } = message;
  const messageDate = new Date(sentDateInGMT);
  const route = useNavigate();


  return (
    <div onClick={ () => route(`/mesage/${ messageId }`) }>
      <div>
        <p>{ sender }</p>
        <p>{ summary }</p>
        <p>{ messageDate.toUTCString() }</p>
      </div>
    </div>
  );
};


export default Message;
