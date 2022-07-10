import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setFolderName } from '../../../redux/slices/folders';


const FoldersSelect = () => {
  const route = useNavigate();
  const dispatch = useAppDispatch();

  const changeHandler = () => {
    dispatch(setFolderName)
  };

  const options = [ 'Inbox', 'Sent', 'Draft', 'Deleted', 'Spam' ];

  return (
    <select onChange={ (event) => route(`/${ event.target.value }/`) }>
      {
        options.map((option) =>
          <option key={ option }>
              { option }
          </option>
        )
      }
    </select>
  );
};


export default FoldersSelect;
