import React, { FC } from 'react';
import Select from './select/Select';
import SelectedMenu from './selectedMenu/SelectedMenu';
import Search from './search/Search';
import Send from './send/Send';

import './toolbar.scss';


const Toolbar: FC = () => {
  return (
    <div className="container">
      <div className='toolbar d-flex ai-center'>

        <Send />
        <Select />
        <SelectedMenu />
        <Search />

      </div>
    </div>
  );
};


export default Toolbar;
