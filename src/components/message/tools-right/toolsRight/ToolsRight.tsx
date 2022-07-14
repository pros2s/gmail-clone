import classNames from 'classnames';
import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import {
  RiArrowGoBackFill,
  RiDeleteBinFill,
  RiSpamFill,
  RiMore2Fill
} from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { removeSeletedById } from '../../../../redux/slices/selectedMessages';
import { removeTool } from '../../../../redux/slices/selectedTools';

import FoldersModal from '../foldersModal/FoldersModal';
import MoreTools from '../moreTools/MoreTools';

import './toolsRight.scss';


interface ToolsRightProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsMore: Dispatch<SetStateAction<boolean>>,
  setIsRead: Dispatch<SetStateAction<boolean>>,
  setIsSelected: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  folder: string,
  isMore: boolean,
  isRead: boolean,
  messageId: string
};

const ToolsRight: FC<ToolsRightProps> = ({
  setFolderNames,
  setIsMore,
  setIsRead,
  setIsSelected,
  setIsMarked,
  folderNames,
  folder,
  isMore,
  isRead,
  messageId
}) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [ showAddMenu, setShowAddMenu ] = useState(false);
  const [ showDelMenu, setShowDelMenu ] = useState(false);

  const onClickRightBtns = (e: MouseEvent<SVGElement>, folder: string) => {
    e.stopPropagation();

    setFolderNames([]);
    setFolderNames((state) => [ ...state, folder ]);

    setIsSelected(false);
    setIsMarked(false);

    dispatch(removeSeletedById(messageId));
  };

  const onClickBack = (e: MouseEvent<SVGElement>) => {
    messageId.toString().length === 1 || messageId.toString() === '10'
      ? onClickRightBtns(e, 'Inbox')
      : onClickRightBtns(e, 'Sent');

    dispatch(removeTool('delete'));
    dispatch(removeTool('spam'));
  };

  const onClickMore = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsMore((state) => !state);
  };

  const onLeaveRightTools = () => {
    setIsMore(false);
    setShowAddMenu(false);
    setShowDelMenu(false);
  };

  const toolsRightClassNames = classNames({
    'message__tools-right': true,
    'sent': params.folder === 'Sent'
  });

  return (
    <div className={ toolsRightClassNames }>
      {
        folder === 'Deleted' || folder === 'Spam'
          ? <RiArrowGoBackFill onClick={ (e) => onClickBack(e) } />
          :
          <>
            <RiSpamFill
              className='message__tools-right-spam'
              title='spam'
              onClick={ (e) => onClickRightBtns(e, 'Spam') } />
            <RiDeleteBinFill
              className='message__tools-right-delete'
              title='delete'
              onClick={ (e) => onClickRightBtns(e, 'Deleted') } />

            <div className="message__tools-right-more d-flex">
              <RiMore2Fill
                title='more'
                onClick={ (e) => onClickMore(e) }/>
              <div
                className={ isMore ? 'message__tools-right-more-menu active' : 'message__tools-right-more-menu' }
                onMouseLeave={ () => onLeaveRightTools() }>
                  <MoreTools
                    setIsMore={ setIsMore }
                    setIsRead={ setIsRead }
                    folderNames={ folderNames }
                    setShowAddMenu={ setShowAddMenu }
                    setShowDelMenu={ setShowDelMenu }
                    isRead={ isRead } />

                  <FoldersModal
                    setFolderNames={ setFolderNames }
                    folderNames={ folderNames }
                    showAddMenu={ showAddMenu }
                    showDelMenu={ showDelMenu }
                    setShowAddMenu={ setShowAddMenu }
                    setShowDelMenu={ setShowDelMenu }  />
              </div>
            </div>
          </>
      }
    </div>
  );
};


export default ToolsRight;
