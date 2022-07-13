import React, { FC, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { changeFolderName, editingToggle } from '../../redux/slices/customFolders';
import ValidateMenu from './validateMenu/ValidateMenu';

import '../../styles/index.scss';


const EditMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { editingFolderName } = useAppSelector((state) => state.customFoldersReducer);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, []);


  const editFolder = (folder: string) => {
    dispatch(changeFolderName(folder));
    dispatch(editingToggle());
  };


  return (
    <div onClick={ (e) => e.stopPropagation() } className='edit-menu d-flex'>
      <ValidateMenu
        defaultValue={ editingFolderName }
        inputRef={ editInputRef }
        title={ 'edit' }
        toggleHandler={ editingToggle }
        submitHandler={ editFolder } />
    </div>
  );
};


export default EditMenu;
