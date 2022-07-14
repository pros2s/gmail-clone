import React, { FC } from 'react';
import { RiArrowDownSLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import './select.scss';


const Select: FC = () => {
  const { folder } = useParams();

  const onSelectAllClick = () => {

  };


  return (
    <div className="toolbar__select d-flex ai-center">
      <button
        className='toolbar__select-all-btn d-flex'
        title='select'
        onClick={ onSelectAllClick }>
          <RiCheckboxCircleLine />
      </button>

      <button className='toolbar__select-arrow d-flex'>
        <RiArrowDownSLine />
      </button>
    </div>
  );
};


export default Select;
