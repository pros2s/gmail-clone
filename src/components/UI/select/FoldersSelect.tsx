import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useTypedSelector';


const FoldersSelect = () => {
  const { folders } = useAppSelector((state) => state.selectFolderReducer);
  const route = useNavigate();


  return (
    <select onChange={ (event) => route(`/${ event.target.value }/`) }>
      {
        folders.map((folder) =>
          <option key={ folder }>
              { folder }
          </option>
        )
      }
    </select>
  );
};


export default FoldersSelect;
