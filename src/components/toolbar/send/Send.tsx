import React, { FC, useState } from 'react';
import { RiMessage3Line, RiCloseLine } from 'react-icons/ri';

import TextareaAutosize from 'react-textarea-autosize';
import uniqid from 'uniqid';
import classNames from 'classnames';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/useAppDispatch';

import { IMessage, IMessageContent } from '../../../types/message';
import { addContent } from '../../../redux/slices/messageBody';
import { addInfo } from '../../../redux/slices/message';
import { addNewMessage } from '../../../redux/slices/filteredMessages';

import './send.scss';


interface ComposeForm {
  emailFrom: string,
  emailTo: string,
  subject: string,
  message: string
};

const Send: FC = () => {
  const dispatch = useAppDispatch();

  const [ isSend, setIsSend ] = useState(false);


  const formFields: ComposeForm = {
    emailFrom: 'default@email.ru',
    emailTo: '',
    subject: '',
    message: ''
  };

  const formValidation = yup.object({
    emailFrom:
      yup.string()
        .required('Not required')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

    emailTo:
      yup.string()
        .required('Not required')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not valid email adress'),

    subject:
      yup.string()
        .max(100, 'Maximum 100 symbols'),

    message:
      yup.string()
        .required('Not required')
        .min(2, 'Minimum 2 symbols')
  });

  const formSubmit = (values: ComposeForm) => {
    const newId = uniqid();

    const newMessage: IMessage = {
      name: values.subject,
      username: 'Alexandr',
      email: values.emailFrom,
      id: newId
    };

    const newMessageContent: IMessageContent = {
      body: values.message,
      id: newId,
      date: (new Date()).toLocaleDateString()
    };

    dispatch(addContent(newMessageContent));
    dispatch(addNewMessage(newMessage));
    dispatch(addInfo(newMessage));

    setIsSend(false);
  };

  const onClickCompose = () => {
    setIsSend((state) => !state);
  };

  const modalClassName = classNames({
    'toolbar__send-modal': true,
    'active': isSend
  })


  return (
    <div className='toolbar__send d-flex ai-center' onClick={ () => onClickCompose() } title='send new message'>
      <button className='toolbar__send-btn d-flex'>
        <RiMessage3Line />
      </button>
      <p className='toolbar__send-text'>Compose</p>

      <div className={ modalClassName }>

        <Formik<ComposeForm>
          initialValues={ formFields }
          validationSchema={ formValidation }
          onSubmit={ (values, { resetForm }) => {
            formSubmit(values);
            resetForm();
          }}>
            {
              ({ handleSubmit, values, handleChange, resetForm }) => (
                <form
                  className='toolbar__send-modal-content d-flex'
                  onSubmit={ handleSubmit }
                  onClick={ (e) => e.stopPropagation() }>
                    <input
                      type='text'
                      name='emailTo'
                      placeholder='To'
                      value={ values.emailTo }
                      onChange={ handleChange } />
                    <ErrorMessage className='toolbar__send-input-error' component='div' name='emailTo' />

                    <input
                      type='email'
                      name='emailFrom'
                      placeholder='From'
                      value={ values.emailFrom }
                      onChange={ handleChange }  />
                    <ErrorMessage className='toolbar__send-input-error' component='div' name='emailFrom' />

                    <input
                      type='text'
                      name='subject'
                      placeholder='Subject'
                      value={ values.subject }
                      onChange={ handleChange }  />
                    <ErrorMessage className='toolbar__send-input-error' component='div' name='subject' />

                    <TextareaAutosize
                      minRows={ 5 }
                      maxRows={ 15 }
                      name='message'
                      placeholder='Message'
                      value={ values.message }
                      onChange={ handleChange }  />
                    <ErrorMessage className='toolbar__send-input-error' component='div' name='message' />

                    <button type='submit'>Send</button>
                    
                    <RiCloseLine
                      className='toolbar__send-close-modal'
                      onClick={ () => setIsSend(false) }
                      title='close'
                      tabIndex={ 1 } />
                </form>
              )
            }
        </Formik>
      </div>
    </div>
  );
};


export default Send;
