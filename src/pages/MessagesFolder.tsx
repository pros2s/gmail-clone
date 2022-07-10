import React, { FC } from 'react';
import MessageList from '../components/messageList/messageList';
import ToolbarWrapper from '../wrappers/ToolbarWrapper';


const MessagesFolder: FC = () => {
  return (
    <div>
      <MessageList />
    </div>
  );
};


export default ToolbarWrapper(MessagesFolder);
