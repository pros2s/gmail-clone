import React, { FC, Dispatch, MouseEvent, SetStateAction } from 'react';
import { RiFolder3Line } from 'react-icons/ri';

import { useAppSelector } from '../../../../hooks/useTypedSelector';

import './foldersModal.scss';


interface FoldersModalProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setShowAddMenu: Dispatch<SetStateAction<boolean>>,
  setShowDelMenu: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  showAddMenu: boolean,
  showDelMenu: boolean
};

const FoldersModal: FC<FoldersModalProps> = ({
  setFolderNames,
  setShowAddMenu,
  setShowDelMenu,
  folderNames,
  showAddMenu,
  showDelMenu
}) => {
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);


  const additionFolders = customFolders.filter((folder) => !folderNames.includes(folder));
  const removeFolders = customFolders.filter((folder) => folderNames.includes(folder));

  const addToFolder = (e: MouseEvent<SVGElement | HTMLDivElement>, folderName: string) => {
    e.stopPropagation();

    setFolderNames((state) => [ ...state, folderName ]);
    setShowAddMenu(false);
  };

  const removeFromFolder = (e: MouseEvent<SVGElement | HTMLDivElement>, folderName: string) => {
    e.stopPropagation();

    setFolderNames((state) => state.filter((folder) => folder !== folderName));
    setShowDelMenu(false);
  };


  return (
    <div
      className={
        (showAddMenu && additionFolders.length > 0) || (showDelMenu && removeFolders)
          ? 'message__tools-right-more-menu-folders active'
          : 'message__tools-right-more-menu-folders'
      }
      onClick={ (e) => e.stopPropagation() }>
        {
          showAddMenu &&
          additionFolders.map((folder) => (
            <div key={ folder } className='d-flex ai-center' onClick={ (e) => addToFolder(e, folder) }>
              <RiFolder3Line />
              <p>{ folder }</p>
            </div>
          ))
        }

        {
          showDelMenu &&
          removeFolders.map((folder) => (
            <div key={ folder } className='d-flex ai-center' onClick={ (e) => removeFromFolder(e, folder) }>
              <RiFolder3Line />
              <p>{ folder }</p>
            </div>
          ))
        }
    </div>
  );
};


export default FoldersModal;
