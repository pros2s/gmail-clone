import classNames from 'classnames';
import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { RiCheckboxCircleLine, RiBookmark3Fill } from 'react-icons/ri';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addChoosed, removeById } from '../../../redux/slices/chosenMessages';

import './toolsLeft.scss';


interface ToolsLeftProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsChecked: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folder: string,
  isChecked: boolean,
  isMarked: boolean,
  id: number
};

const ToolsLeft: FC<ToolsLeftProps> = ({
  setFolderNames,
  setIsChecked,
  setIsMarked,
  folder,
  isChecked,
  isMarked,
  id
}) => {
  const dispatch = useAppDispatch();

  const onClickCheck = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    isChecked
      ? dispatch(removeById(id))
      : dispatch(addChoosed(id));

    setIsChecked((state) => !state);
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
          title='choose'
          className={ isChecked ? 'message__check active' : 'message__check' }
          onClick={ (e) => onClickCheck(e) } />

        <RiBookmark3Fill
          title='mark'
          className={ isMarked ? 'message__star active' : 'message__star' }
          onClick={ (e) => onClickMark(e) } />
      </div>
  );
};


export default ToolsLeft;
