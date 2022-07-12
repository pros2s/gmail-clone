import React, { FC, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { additionToggle, addNewFolder } from '../../../redux/slices/customFolders';
import ValidateMenu from '../validateMenu/ValidateMenu';

import '../../../styles/index.scss';

const AddMenu: FC = () => {
  const dispatch = useAppDispatch();
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    addInputRef.current?.focus();
  }, []);


  const addFolder = (folder: string) => {
    dispatch(addNewFolder(folder));
    dispatch(additionToggle());
  }


  return (
    <div className='add-menu d-flex'>
      <ValidateMenu
        defaultValue=''
        inputRef={ addInputRef }
        title={ 'add' }
        toggleHandler={ additionToggle }
        submitHandler={ addFolder } />
    </div>
  );
};


export default AddMenu;
