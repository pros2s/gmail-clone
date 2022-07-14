import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiCheckboxCircleLine, RiBookmark3Fill } from 'react-icons/ri';
import classNames from 'classnames';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addSelected, removeSeletedById } from '../../../redux/slices/selectedMessages';
import { removeTool, setTool } from '../../../redux/slices/selectedTools';
import { IFolders } from '../../../types/message';

import './toolsLeft.scss';


interface ToolsLeftProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsSelected: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  isSelected: boolean,
  isMarked: boolean,
  folder: string,
  id: string
};

const ToolsLeft: FC<ToolsLeftProps> = ({
  setFolderNames,
  setIsSelected,
  setIsMarked,
  folderNames,
  isSelected,
  isMarked,
  folder,
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

    if (isMarked) {
      setFolderNames((state) => state.filter((item) => item !== 'Marked'));
      dispatch(removeTool('marked'));
    }
    else {
      setFolderNames((state) => [ ...state, 'Marked' ]);
      dispatch(setTool('marked'));
    };

    setIsMarked((state) => !state);
  };

  const toolsLeftClassNames = classNames({
    'message__tools-left': true,
    'd-flex': true,
    'hidden': folder === 'Deleted' || folder === 'Spam'
  });


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
