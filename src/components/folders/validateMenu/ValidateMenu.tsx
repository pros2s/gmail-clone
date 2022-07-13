import React, { FC, RefObject } from 'react';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { RiCheckFill, RiAddLine, RiCloseLine } from 'react-icons/ri';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useTypedSelector';

import '../../../styles/index.scss';
import './validateMenu.scss';


interface NewFolder {
  folderInput: string
};

interface ValidateMenuProps {
  defaultValue: string,
  inputRef: RefObject<HTMLInputElement>,
  title: string,
  toggleHandler: ActionCreatorWithoutPayload<string>
  submitHandler: (folder: string) => void,
}

const ValidateMenu: FC<ValidateMenuProps> = ({ defaultValue, inputRef, title, toggleHandler, submitHandler }) => {
  const dispatch = useAppDispatch();
  const { customFolders } = useAppSelector((state) => state.customFoldersReducer);


  return (
    <Formik<NewFolder>
      initialValues={{
        folderInput: defaultValue
      }}
      validationSchema={
        yup.object({
          folderInput:
            yup.string()
              .max(15, 'Maximum 15 symbols')
              .required('Not required')
              .notOneOf(customFolders, 'Already exists')
        })
      }
      onSubmit={
        (values) => {
          submitHandler(values.folderInput);
        }
      }>
        {
          ({ handleSubmit, values, handleChange }) => (
            <div className='validate-menu d-flex'>
              <div className="d-flex ai-center">
                <form className='validate-menu__form' onSubmit={ handleSubmit }>
                  <input
                    maxLength={ 15 }
                    ref={ inputRef }
                    type='text'
                    name='folderInput'
                    value={ values.folderInput.trim() }
                    onChange={ handleChange } />

                  <button type='submit' className='d-flex'>
                    {
                      defaultValue
                        ? <RiCheckFill title={ title } />
                        : <RiAddLine title={ title } />
                    }
                  </button>
                </form>
                <RiCloseLine onClick={ () => dispatch(toggleHandler()) } title='cancel' tabIndex={ 1 } />
              </div>
              <ErrorMessage className='validate-menu__error' component='div' name='folderInput' />
            </div>
          )
        }
    </Formik>
  );
};


export default ValidateMenu;
