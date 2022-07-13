import React, { FC } from 'react';
import { RiMessage3Line } from 'react-icons/ri';

import './send.scss';


const Send: FC = () => {
  return (
    <div className="toolbar__send d-flex ai-center">
      <button className='toolbar__send-btn d-flex'>
        <RiMessage3Line />
      </button>
      <p className="toolbar__send-text">Send message</p>
    </div>
  );
};


export default Send;
