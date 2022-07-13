import React, { FC } from 'react';
import { RiArrowDownSLine, RiCheckboxCircleLine } from 'react-icons/ri';

import './choose.scss';


const Choose: FC = () => {


  return (
    <div className="toolbar__choose d-flex ai-center">
      <button className='toolbar__choose-all-btn d-flex'>
        <RiCheckboxCircleLine />
      </button>

      <button className='toolbar__choose-arrow d-flex'>
        <RiArrowDownSLine />
      </button>
    </div>
  );
};


export default Choose;
