import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiFolderSharedLine, RiMailCheckLine, RiFolderReceivedLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/useTypedSelector';

import './moreTools.scss';


interface MoreToolsProps {
  setIsRead: Dispatch<SetStateAction<boolean>>,
  setIsMore: Dispatch<SetStateAction<boolean>>,
  setShowAddMenu: Dispatch<SetStateAction<boolean>>,
  setShowDelMenu: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  isRead: boolean
};

const MoreTools: FC<MoreToolsProps> = ({ setIsMore, setIsRead, setShowAddMenu, setShowDelMenu, folderNames, isRead }) => {
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);
  const { folder } = useParams();


  const markAsRead = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsRead(true);
    setIsMore(false);
  };

  const showAdditionMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setShowDelMenu(false);
    customFolders.length !== 0 && setShowAddMenu((state) => !state);
  };

  const showRemoveMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setShowAddMenu(false);
    customFolders.filter((folder) => folderNames.includes(folder)).length !== 0 && setShowDelMenu((state) => !state);
  };


  return (
    <div className='message__tools-right-more-menu-choose' onClick={ (e) => e.stopPropagation() }>
      <div className='d-flex ai-center' onClick={ (e) => showAdditionMenu(e) }>
        <p>add to</p>
        <RiFolderSharedLine />
      </div>

      <div className='d-flex ai-center' onClick={ (e) => showRemoveMenu(e) }>
        <p>remove from</p>
        <RiFolderReceivedLine />
      </div>

      {
        folder !== 'Sent' && !isRead &&
        <div className='d-flex ai-center' onClick={ (e) => markAsRead(e) }>
          <p>mark as read</p>
          <RiMailCheckLine />
        </div>
      }
    </div>
  );
};


export default MoreTools;
