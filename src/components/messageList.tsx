import React, { FC, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uniqid from 'uniqid';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelectore } from '../hooks/useTypedSelector';
import { fetchApiMessages } from '../redux/slices/ActionCreatores';


const MessageList: FC = () => {
  const { messages, isLoading, error } = useAppSelectore((state) => state.messagesReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiMessages());
  }, []);


  return (
    <div>
      { isLoading && <h1>Loaging...</h1> }
      { error && <h1>Error</h1> }
      {
        <TransitionGroup>
          {
            messages.map((message) => (
              <CSSTransition
                key={ uniqid() }
                timeout={ 450 }>
                  <h1>{ message.name }</h1>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      }
    </div>
  );
};


export default MessageList;
