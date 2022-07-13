import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { fetchApiMessageById, fetchMessageContent } from '../../redux/slices/ActionCreators';

import './messageInfo.scss';
import '../../styles/index.scss';
import FoldersWrapper from '../../wrappers/FoldersWrapper';


interface IMessageInfoProps {
  messageId: string | undefined
}

const MessageInfo: FC<IMessageInfoProps> = ({ messageId }) => {
  const { content, isError, isLoading } = useAppSelector((state) => state.messageInfoReducer);
  const { info } = useAppSelector((state) => state.messageItemReducer);

  const dispatch = useAppDispatch();

  const rightId = messageId?.length === 1 || messageId === '10';

  useEffect(() => {
    if (rightId) {
      dispatch(fetchApiMessageById(messageId));
      dispatch(fetchMessageContent(messageId));
    }
  }, []) //eslint-disable-line


  return (
    <div style={{ width: '100%' }}>
      { isLoading && <h1>Loading message...</h1>}
      {
        isError ? <h1>{ isError }</h1> :

        <div className="message__content">
          <div className="message__content-title d-flex">
            <span>Theme:</span>
            <h1>{ info?.username }</h1>
          </div>

          <div className="message__content-name d-flex">
            <span>Author:</span>
            <h3>{ info?.name }</h3>
          </div>

          <div className="message__content-email d-flex">
            <span>From:</span>
            <a href={`mailto:${ info?.email}`}>{ info?.email }</a>
          </div>

          <div className="message__content-body d-flex">
            <span>Message:</span>
            <p>{ content?.body }</p>
          </div>
        </div>
      }
    </div>
  );
};


export default FoldersWrapper(MessageInfo);
