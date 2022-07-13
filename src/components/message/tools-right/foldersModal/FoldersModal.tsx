import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiFolder2Fill } from 'react-icons/ri';
import { useAppSelector } from '../../../../hooks/useTypedSelector';

import './foldersModal.scss';


interface FoldersModalProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsMore: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  isShowModal: boolean
};

const FoldersModal: FC<FoldersModalProps> = ({ setFolderNames, setIsMore, folderNames, isShowModal }) => {
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);


  const filteredCustomFolders = customFolders.filter((folder) => !folderNames.includes(folder));

  const addToFolder = (e: MouseEvent<SVGElement | HTMLDivElement>, folderName: string) => {
    e.stopPropagation();

    setFolderNames((state) => [ ...state, folderName ]);
    setIsMore(false);
  };


  return (
    <div className={
      isShowModal
        ? 'message__tools-right-more-menu-folders active'
        : 'message__tools-right-more-menu-folders' }>
          {
            filteredCustomFolders.map((folder) => (
              <div key={ folder } className='d-flex ai-center' onClick={ (e) => addToFolder(e, folder) }>
                <RiFolder2Fill />
                <p>{ folder }</p>
              </div>
            ))
          }
    </div>
  );
};


export default FoldersModal;
