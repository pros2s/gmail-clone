import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiInboxUnarchiveLine,
  RiSendPlane2Line,
  RiDraftFill,
  RiDeleteBinLine,
  RiSpamLine,
  RiStarLine
} from 'react-icons/ri';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { setCurrentFolder } from '../../redux/slices/folders';

import './folders.scss';


const Folders: FC = () => {
  const { folders } = useAppSelector((state) => state.foldersReducer);
  const dispatch = useAppDispatch();
  const route = useNavigate();


  const onFolderClick = (folder: string) => {
    dispatch(setCurrentFolder(folder));
    route(`/mailclone/${ folder }`);
  };

  const icons = [
    <RiInboxUnarchiveLine />,
    <RiSendPlane2Line />,
    <RiStarLine />,
    <RiDraftFill />,
    <RiDeleteBinLine />,
    <RiSpamLine />
  ];

  const foldersElements = folders.map((folder, i) => {
    return (
      <li
        className="folders__item d-flex"
        key={ folder }
        onClick={ () => onFolderClick(folder) }>
          { icons[i] }
          <p>{ folder }</p>
      </li>
    )
  })


  return (
    <ul className='folders'>
      { foldersElements }
    </ul>
  );
};


export default Folders;
