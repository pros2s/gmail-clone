import React, { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { setFilteredMessages } from '../../../redux/slices/filteredMessages';

import './search.scss';


const Search: FC = () => {
  const { messages } = useAppSelector((state) => state.messagesReducer);
  const dispatch = useAppDispatch();
  const [ value, setValue ] = useState('');
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    !value && onSearchClick();
  }, [ value ]); //eslint-disable-line

  const onSearchClick = () => {
    const filteredMessagesByUsername = messages.filter((message) => message.username.toLowerCase().includes(value));
    const filteredMessagesByName = messages.filter((message) => message.name.toLowerCase().includes(value));

    const filteredMessages = filteredMessagesByName.length === 0 ? filteredMessagesByUsername : filteredMessagesByName;

    dispatch(setFilteredMessages(filteredMessages));
  };

  const clickSearchBtn = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      searchBtnRef.current?.focus();
  };


  return (
    <div className="toolbar__search">
      <input
        placeholder='Search message'
        type="text"
        name='search'
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
        onKeyUp={ (e) => clickSearchBtn(e) } />
      <button
        ref={ searchBtnRef }
        type='submit'
        className='d-flex'
        onClick={ () => onSearchClick() }>
          <RiSearch2Line />
      </button>
    </div>
  );
};


export default Search;
