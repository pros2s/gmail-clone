import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  RiDeleteBinLine,
  RiSpamLine,
  RiMailCheckLine,
  RiBookmark3Line,
  RiMailUnreadLine,
  RiBookmark2Line
} from 'react-icons/ri';

import { useAppSelector } from '../../../hooks/useTypedSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

import { clearTools, removeTool, setTool } from '../../../redux/slices/selectedTools';

import './selectedMenu.scss';


const SelectedMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { folder } = useParams();
  const { folderNamesArray } = useAppSelector((state) => state.selectedMessagesReducer);
  const { selectedType } = useAppSelector((state) => state.selectedMenuReducer);


  const onClicktool = (settingTool: string, removingTool: string) => {
    settingTool === 'delete' || settingTool === 'spam'
      ? dispatch(clearTools())
      : dispatch(removeTool(removingTool));

    dispatch(setTool(settingTool));
  };


  return (
    <>
      {
        folderNamesArray.length > 0 &&
        <div className='selectedMenu d-flex ai-center'>
          {
            folder !== 'Sent' &&
            <>
              {
                selectedType !== 'Read' &&
                <button
                  title='Mark as read'
                  className='selectedMenu__read d-flex'
                  onClick={ () => onClicktool('read', 'unread') }>
                    <RiMailCheckLine />
                </button>
              }

              {
                selectedType !== 'Unread' &&
                <button
                  title='Mark as Unread'
                  style={{ marginRight: 20 }}
                  className='selectedMenu__unread d-flex'
                  onClick={ () => onClicktool('unread', 'read') }>
                    <RiMailUnreadLine />
                </button>
              }
            </>
          }
          <>
            {
              selectedType !== 'Marked' &&
              <button
                title='Mark'
                className='selectedMenu__mark d-flex'
                onClick={ () => onClicktool('marked', 'unmarked') }>
                  <RiBookmark3Line />
              </button>
            }

            {
              selectedType !== 'Unmarked' &&
              <button
                title='Unmark'
                style={{ marginRight: 20 }}
                className='selectedMenu__unmark d-flex'
                onClick={ () => onClicktool('unmarked', 'marked') }>
                  <RiBookmark2Line />
              </button>
            }
          </>

          <button
            title='Delete'
            className='selectedMenu__delete d-flex'
            onClick={ () => onClicktool('delete', '') }>
              <RiDeleteBinLine />
          </button>

          {
            folder !== 'Sent' &&
            <button
              title='Spam'
              className='selectedMenu__spam d-flex'
              onClick={ () => onClicktool('spam', '') }>
                <RiSpamLine />
            </button>
          }
        </div>
      }
    </>
  );
};


export default SelectedMenu;
