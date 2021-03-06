import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  RiArrowDownSLine,
  RiBookmark2Line,
  RiBookmark3Line,
  RiCheckboxCircleLine,
  RiMailCheckLine,
  RiMailUnreadLine
} from 'react-icons/ri';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useTypedSelector';

import { selectedAllToggle, setSelectedType } from '../../../redux/slices/selectedMenu';

import './select.scss';


const Select: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedType } = useAppSelector((state) => state.selectedMenuReducer);

  const { folder } = useParams();
  const [ isArrow, setIsArrow ] = useState(false);

  useEffect(() => {
    setIsArrow(false);
  }, [ folder ]);


  const onSelectMenu = (selectType: string) => {
    setIsArrow(false);

    selectedType === selectType
      ? dispatch(setSelectedType('default'))
      : dispatch(setSelectedType(selectType));
  };


  return (
    <>
      {
        folder !== 'Spam' && folder !== 'Deleted' &&
        
        <div className='toolbar__select d-flex ai-center'>
          <button
            className='toolbar__select-all-btn d-flex'
            title='select all'
            onClick={ () => dispatch(selectedAllToggle()) }>
              <RiCheckboxCircleLine />
          </button>

          <button
            className='toolbar__select-arrow d-flex'
            onClick={ () => setIsArrow((state) => !state) }
            title='select by...'>
              <RiArrowDownSLine />
              <>
                {
                  isArrow &&
                  <div
                    className='toolbar__which-select d-flex'
                    onMouseLeave={ () => setIsArrow(false) }
                    onClick={ (e) => e.stopPropagation() }>
                      {
                        folder !== 'Sent' &&
                        <>
                          <div className='d-flex ai-center' onClick={ () => onSelectMenu('Read') } title='select by read'>
                            <RiMailCheckLine />
                            <p>Read</p>
                          </div>

                          <div className='d-flex ai-center' onClick={ () => onSelectMenu('Unread') } title='select by unread'>
                            <RiMailUnreadLine />
                            <p>Unread</p>
                          </div>
                        </>
                      }

                      {
                        folder !== 'Marked' &&
                        <>
                          <div className='d-flex ai-center' onClick={ () => onSelectMenu('Marked') } title='select by marked' >
                            <RiBookmark3Line />
                            <p>Marked</p>
                          </div>
                          <div className='d-flex ai-center' onClick={ () => onSelectMenu('Unmarked') } title='select by unmarked' >
                            <RiBookmark2Line />
                            <p>Unmarked</p>
                          </div>
                        </>
                      }
                    </div>
                }
              </>
          </button>
        </div>
      }
    </>
  );
};


export default Select;
