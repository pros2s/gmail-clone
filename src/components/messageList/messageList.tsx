import React, { FC, useEffect } from 'react';
import uniqid from 'uniqid';
import { motion } from 'framer-motion';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { clearSelected } from '../../redux/slices/selectedMessages';
import { fetchApiMessages } from '../../redux/slices/ActionCreators';
import Message from '../message/Message';

import './messageList.scss';
import '../../styles/index.scss';
import { selectedAllFalse } from '../../redux/slices/selectedMenu';
import { clearTools } from '../../redux/slices/selectedTools';
import { setFilteredMessages } from '../../redux/slices/filteredMessages';
import LoaderComp from '../loader/Loader';


const MessageList: FC = () => {
  const { messages, isLoading, error } = useAppSelector((state) => state.messagesReducer);
  const { filteredMessages } = useAppSelector((state) => state.filteredMessagesReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearTools());
    dispatch(selectedAllFalse());
    dispatch(clearSelected());
    dispatch(fetchApiMessages());
    dispatch(setFilteredMessages(messages));
  }, []); // eslint-disable-line


  return (
    <div style={{ width: '100%' }}>
      {
        isLoading ? <LoaderComp /> :
        <div className='message__list'>
            <div>
              {
                filteredMessages.map((message) => (
                  <motion.div
                    key={ uniqid() }
                    whileInView={{ scale: [0.8, 1] }}
                    transition={{ duration: 0.4 }}>
                      <Message message={ message } />
                  </motion.div>
                ))
              }
            </div>
          { error && <h1>Error</h1> }
        </div>
      }
    </div>
  );
};


export default MessageList;
