import React, { FC } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';

import '../../styles/index.scss';
import './notFound.scss';


const NotFound: FC = () => {
  const route = useNavigate();
  const { currentFolder } = useAppSelector((state) => state.foldersReducer);
  

  return (
    <div className='container'>
      <div className="error">
        <h1 className="error__title">Error 404</h1>
        <h3 className="error__not-found">Page not found</h3>
        <div className="error__come-back d-flex">
          <MdOutlineArrowBackIosNew className='error__come-back-btn' onClick={ () => route(`/mailclone/${ currentFolder }`)}/>
          <p>Lets come back</p>
        </div>
      </div>
    </div>
  );
};


export default NotFound;
