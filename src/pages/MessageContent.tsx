import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MessageInfo from '../components/messageInfo/MessageInfo';


const MessageContent: FC = () => {
  const params = useParams();


  return (
  <div>
    <MessageInfo messageId={ params.id } />
  </div>
  );
};


export default MessageContent;
