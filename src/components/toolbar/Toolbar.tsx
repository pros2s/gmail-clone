import React, { FC } from 'react';
import Choose from './choose/Choose';
import Search from './search/Search';
import Send from './send/Send';

import './toolbar.scss';


const Toolbar: FC = () => {
  return (
    <div className="container">
      <div className='toolbar d-flex ai-center'>

        <Send />
        <Choose />
        <Search />

      </div>
    </div>
  );
};


export default Toolbar;
