import React, { FC } from 'react';
import FoldersSelect from '../select/FoldersSelect';

import './toolbar.scss';


const Toolbar: FC = () => {
  return (
    <div className='toolbar'>
      <FoldersSelect />
    </div>
  );
};


export default Toolbar;
