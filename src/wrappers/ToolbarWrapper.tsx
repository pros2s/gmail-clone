import React, { FC, ComponentType } from 'react';

import Toolbar from '../components/UI/toolbar/Toolbar';


const ToolbarWrapper = <P extends object>(Component: ComponentType<P>): FC<P> => function HOC({ ...props }) {
  return (
    <>
      <Toolbar />
      <Component { ...props } />
    </>
  );
};


export default ToolbarWrapper;
