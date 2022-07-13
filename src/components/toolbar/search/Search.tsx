import React, { FC } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

import './search.scss';


const Search: FC = () => {


  return (
    <div className="toolbar__search">
      <label htmlFor="search">
        <input placeholder='Search message' type="text" name='search' />
        <button type='submit' className='d-flex'>
          <RiSearch2Line />
        </button>
      </label>
    </div>
  );
};


export default Search;
