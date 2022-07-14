import React, { FC } from 'react';
import { RiGithubFill } from 'react-icons/ri';

import './footer.scss';


const Footer: FC = () => {
  return (
    <div className='footer'>
      <a
        href='https://github.com/pros2s'
        className='footer__github'
        target='_blank'
        rel='noreferrer' >
          <RiGithubFill />
      </a>

      <a
        href='https://alexandr-portfolio.netlify.app/'
        className='footer__sign'
        target='_blank'
        rel='noreferrer' >
          <p>@2022 ALEXANDR</p>
      </a>
    </div>
  );
};


export default Footer;
