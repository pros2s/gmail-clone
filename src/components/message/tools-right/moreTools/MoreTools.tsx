import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiFolderSharedLine,RiMailCheckLine } from 'react-icons/ri';

import { useAppSelector } from '../../../../hooks/useTypedSelector';

import './moreTools.scss';


interface MoreToolsProps {
  setIsShowModal: Dispatch<SetStateAction<boolean>>,
  setIsRead: Dispatch<SetStateAction<boolean>>,
  setIsMore: Dispatch<SetStateAction<boolean>>
};

const MoreTools: FC<MoreToolsProps> = ({ setIsMore, setIsRead, setIsShowModal}) => {
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);

  const markAsRead = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsRead(true);
    setIsMore(false);
  };

  const showFoldersMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    customFolders.length !== 0 && setIsShowModal((state) => !state);
  };


  return (
    <div className='message__tools-right-more-menu-choose'>
      <div className='d-flex ai-center' onClick={ (e) => showFoldersMenu(e) }>
        <p>add to</p>
        <RiFolderSharedLine />
      </div>

      <div className='d-flex ai-center' onClick={ (e) => markAsRead(e) }>
        <p>mark as read</p>
        <RiMailCheckLine />
      </div>
    </div>
  );
};


export default MoreTools;
