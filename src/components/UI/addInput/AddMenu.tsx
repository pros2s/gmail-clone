import React, { FC, useEffect, useRef } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';

import './addMenu.scss';
import '../../../styles/index.scss';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { additionToggle } from '../../../redux/slices/customFolders';


const AddMenu: FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  return (
    <div className='add-menu d-flex'>
      <div>
        <input ref={ inputRef } type='text' name='new folder' />
        <RiAddLine title='add' />
      </div>

      <RiCloseLine title='cancel' onClick={ () => dispatch(additionToggle()) } />
    </div>
  );
};


export default AddMenu;
