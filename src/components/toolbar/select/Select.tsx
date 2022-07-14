import React, { FC } from 'react';
import { RiArrowDownSLine, RiCheckboxCircleLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { selectedAllToggle } from '../../../redux/slices/selectedAll';

import './select.scss';


const Select: FC = () => {
  const dispatch = useAppDispatch();
  const { folder } = useParams();


  return (
    <>
      {
        folder !== 'Spam' && folder !== 'Deleted' &&
        <div className="toolbar__select d-flex ai-center">
          <button
            className='toolbar__select-all-btn d-flex'
            title='select'
            onClick={ () => dispatch(selectedAllToggle()) }>
              <RiCheckboxCircleLine />
          </button>

          <button className='toolbar__select-arrow d-flex'>
            <RiArrowDownSLine />
            <div className="toolbar__which-select d-flex">

            </div>
          </button>
        </div>
      }
    </>
  );
};


export default Select;
