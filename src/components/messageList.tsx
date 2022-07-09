import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { message } from '../types/message';

import Message from './message';


interface IMessages {
  messages: message[]
};


const MessageItem: FC<IMessages> = ({ messages }) => {
  return (
    <div>
      <div>
        <TransitionGroup>
          {
            messages.map((message, i) => (
              <CSSTransition
                key={ message.messageId }
                timeout={ 450 }
                classNames='message__animation'
              >
                <Message message={ message }/>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </div>
    </div>
  );
};


export default MessageItem;
