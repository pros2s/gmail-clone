import React, { FC } from 'react';

import loader from '../../assets/379.gif';
import './loader.scss';


const LoaderComp: FC = () => {
  return (
    <div className='loader'>
      <img style={{ display: 'block' }} src={ loader } alt="loading" />
    </div>
  );
};


export default LoaderComp;
