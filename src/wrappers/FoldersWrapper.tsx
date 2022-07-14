import React, { FC, ComponentType } from 'react';

import Folders from '../components/folders/folders/Folders';

import '../styles/index.scss';


const FoldersWrapper = <P extends object>(Component: ComponentType<P>): FC<P> => function HOC({ ...props }) {
  return (
    <>
      <div className='container folders-wrapper d-flex'>
        <Folders />
        <Component { ...props } />
      </div>
    </>
  );
};


export default FoldersWrapper;
