import React, { FC, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uniqid from 'uniqid';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { fetchApiMessages } from '../../redux/slices/ActionCreators';
import Message from '../message/Message';

import './messageList.scss';
import '../../styles/index.scss';
import FoldersWrapper from '../../wrappers/foldersWrapper/FoldersWrapper';


const MessageList: FC = () => {
  const { messages, isLoading, error } = useAppSelector((state) => state.messagesReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiMessages());
  }, []); // eslint-disable-line


  return (
    <div>

      <div className='message__list'>
        { isLoading && <h1>Loaging...</h1> }
        { error && <h1>Error</h1> }
        {
          <TransitionGroup>
            {
              messages.map((message) => (
                <CSSTransition
                  key={ uniqid() }
                  timeout={ 450 }>
                    <Message message={ message } />
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        }
      </div>

    </div>
  );
};


export default FoldersWrapper(MessageList);
