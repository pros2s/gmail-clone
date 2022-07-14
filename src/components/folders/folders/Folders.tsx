import React, { FC, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RiInboxUnarchiveLine,
  RiSendPlane2Line,
  RiDraftFill,
  RiDeleteBinLine,
  RiSpamLine,
  RiBookmark3Fill,
  RiAddLine,
  RiFolder2Fill,
  RiEdit2Fill
} from 'react-icons/ri';

import AddMenu from '../AddMenu';
import EditMenu from '../EditMenu';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import onKeyUp from '../../../hooks/useKeyUp';
import {
  additionToggle,
  editingToggle,
  setEditingFolderName,
  removeCustomFolder
} from '../../../redux/slices/customFolders';

import '../../../styles/index.scss';
import './folders.scss';


const Folders: FC = () => {
  const route = useNavigate();
  const params = useParams();
  const folderName = params.folder;

  const dispatch = useAppDispatch();
  const { addition, editing, editingFolderName, customFolders } = useAppSelector((state) => state.customFoldersReducer);


  const mainFolders = [ 'Inbox', 'Sent', 'Marked', 'Draft', 'Deleted', 'Spam' ];

  const icons = [
    <RiInboxUnarchiveLine />,
    <RiSendPlane2Line />,
    <RiBookmark3Fill />,
    <RiDraftFill />,
    <RiDeleteBinLine />,
    <RiSpamLine />
  ];

  const mainFoldersElements = mainFolders.map((folder, i) => {
    return (
      <li
        className={ folder === folderName ? 'folders__item active d-flex' : 'folders__item d-flex' }
        tabIndex={ 1 }
        onKeyUp={ (e) => onKeyUp(e) }
        key={ folder }
        title={ folder }
        onClick={ () => route(`/mailclone/${ folder }`) }>
          <div className='folders__item-info d-flex'>
            { icons[i] }
            <p>{ folder }</p>
          </div>
      </li>
    )
  });

  const onClickEdit = (folder: string, e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    dispatch(editingToggle());
    dispatch(setEditingFolderName(folder))
  };

  const onClickDelete = (folder: string, e: MouseEvent<SVGElement>) => {

    e.stopPropagation();
    route(`/mailclone/Inbox`);
    dispatch(removeCustomFolder(folder))
  };


  const customFoldersElements = customFolders.map((folder) => {
    return (
      <li
        tabIndex={ 1 }
        onKeyUp={ (e) => onKeyUp(e) }
        key={ folder }
        title={ folder }
        onClick={ () => route(`/mailclone/${ folder }`) }>
          {
            editingFolderName === folder && editing ? <EditMenu /> :
            <div className={ folder === folderName ? 'folders__item active d-flex' : 'folders__item d-flex' }>
              <div title={ folder } className='folders__item-info d-flex'>
                <RiFolder2Fill />
                <p className='folders__item-info-name'>{ folder }</p>
              </div>
              <div className='folders__item-tools d-flex'>
                <RiEdit2Fill
                  className='folders__item-tools-edit'
                  title='edit'
                  onClick={ (e) => onClickEdit(folder, e) } />
                <RiDeleteBinLine
                  className='folders__item-tools-remove'
                  title='delete'
                  onClick={ (e) => onClickDelete(folder, e) } />
              </div>
            </div>
          }
      </li>
    )
  });


  return (
    <div className='folders'>
      <ul>
        { mainFoldersElements }
      </ul>

      <div className='folders__line'></div>

      <ul className='folders__custom'>
        { customFoldersElements }
      </ul>

      {
        customFolders.length < 8 &&
        <>
          {
            addition ? <AddMenu /> :
            <button
              tabIndex={ 1 }
              onKeyUp={ (e) => onKeyUp(e) }
              className='folders__add d-flex'
              title='add new folder'
              onClick={ () => dispatch(additionToggle()) }>
                <RiAddLine />
            </button>
          }
        </>
      }
    </div>
  );
};


export default Folders;
