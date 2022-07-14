import classNames from 'classnames';
import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiCheckboxCircleLine, RiBookmark3Fill } from 'react-icons/ri';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addSelected, removeSeletedById } from '../../../redux/slices/selectedMessages';
import { IFolders } from '../../../types/message';

import './toolsLeft.scss';


interface ToolsLeftProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsSelected: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folder: string,
  folderNames: string[],
  isSelected: boolean,
  isMarked: boolean,
  id: string
};

const ToolsLeft: FC<ToolsLeftProps> = ({
  setFolderNames,
  setIsSelected,
  setIsMarked,
  folder,
  folderNames,
  isSelected,
  isMarked,
  id
}) => {
  const dispatch = useAppDispatch();

  const onClickCheck = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    const newSelected: IFolders = {
      folders: folderNames,
      id
    };

    isSelected
      ? dispatch(addSelected(newSelected))
      : dispatch(removeSeletedById(id));

    setIsSelected((state) => !state);
  };

  const onClickMark = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    isMarked
      ? setFolderNames((state) => state.filter((item) => item !== 'Marked'))
      : setFolderNames((state) => [ ...state, 'Marked' ]);

    setIsMarked((state) => !state);
  };

  const toolsLeftClassNames = classNames({
    'message__tools-left': true,
    'd-flex': true,
    'hidden': folder === 'Deleted' || folder === 'Spam'
  })

  return (
      <div className={ toolsLeftClassNames }>
        <RiCheckboxCircleLine
          title='select'
          className={ isSelected ? 'message__check active' : 'message__check' }
          onClick={ (e) => onClickCheck(e) } />

        <RiBookmark3Fill
          title='mark'
          className={ isMarked ? 'message__star active' : 'message__star' }
          onClick={ (e) => onClickMark(e) } />
      </div>
  );
};


export default ToolsLeft;
