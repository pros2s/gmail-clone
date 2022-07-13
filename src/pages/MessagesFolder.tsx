import React, { FC } from 'react';
import MessageList from '../components/messageList/messageList';
import FoldersWrapper from '../wrappers/FoldersWrapper';
import ToolbarWrapper from '../wrappers/ToolbarWrapper';


const MessagesFolder: FC = () => {
  return (
    <div>
      <MessageList />
    </div>
  );
};


export default ToolbarWrapper(FoldersWrapper(MessagesFolder));
