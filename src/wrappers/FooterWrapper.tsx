import React, { FC, ComponentType } from 'react';

import Footer from '../components/footer/Footer';

import '../styles/index.scss';


const FooterWrapper = <P extends object>(Component: ComponentType<P>): FC<P> => function HOC({ ...props }) {
  return (
    <>
      <div className='container folders-wrapper d-flex'>
        <Component { ...props } />
        <Footer />
      </div>
    </>
  );
};


export default FooterWrapper;
