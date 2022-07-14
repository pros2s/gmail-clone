import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  RiDeleteBinLine,
  RiSpamLine,
  RiFolderSharedLine,
  RiMailCheckLine,
  RiFolderReceivedLine,
  RiBookmark3Line
} from 'react-icons/ri';

import { useAppSelector } from '../../../hooks/useTypedSelector';

import './selectedMenu.scss';


const SelectedMenu: FC = () => {
  const { folder } = useParams();
  const { messagesId } = useAppSelector((state) => state.selectedMessagesReducer);

  return (
    <>
      {
        messagesId.length > 0 &&
        <div className='selectedMenu d-flex ai-center'>
          {
            folder !== 'Sent' &&
            <button title='Mark as read' className='selectedMenu__read d-flex'>
              <RiMailCheckLine />
            </button>
          }
          <button title='Add to' className='selectedMenu__addTo d-flex'>
            <RiFolderSharedLine />
          </button>

          <button title='Remove from' className='selectedMenu__removeFrom d-flex'>
            <RiFolderReceivedLine />
          </button>

          <button title='Mark' className='selectedMenu__mark d-flex'>
            <RiBookmark3Line />
          </button>

          <button title='Delete' className='selectedMenu__delete d-flex'>
            <RiDeleteBinLine />
          </button>
          {
            folder !== 'Sent' &&
            <button title='Spam' className='selectedMenu__spam d-flex'>
              <RiSpamLine />
            </button>
          }
        </div>
      }
    </>
  );
};


export default SelectedMenu;
