import React, { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import {
  RiArrowGoBackFill,
  RiDeleteBinFill,
  RiSpamFill,
  RiMore2Fill
} from 'react-icons/ri';

import FoldersModal from '../foldersModal/FoldersModal';
import MoreTools from '../moreTools/MoreTools';

import './toolsRight.scss';


interface ToolsRightProps {
  setFolderNames: Dispatch<SetStateAction<string[]>>,
  setIsMore: Dispatch<SetStateAction<boolean>>,
  setIsRead: Dispatch<SetStateAction<boolean>>,
  setIsChecked: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  folder: string,
  isMore: boolean,
  messageId: string
};

const ToolsRight: FC<ToolsRightProps> = ({
  setFolderNames,
  setIsMore,
  setIsRead,
  setIsChecked,
  setIsMarked,
  folderNames,
  folder,
  isMore,
  messageId
}) => {
  const [ showAddMenu, setShowAddMenu ] = useState(false);
  const [ showDelMenu, setShowDelMenu ] = useState(false);

  const onClickRightBtns = (e: MouseEvent<SVGElement>, folder: string) => {
    e.stopPropagation();

    setFolderNames([]);
    setFolderNames((state) => [ ...state, folder ]);

    setIsChecked(false);
    setIsMarked(false);
  };

  const onClickBack = (e: MouseEvent<SVGElement>) => {
    messageId.toString().length === 1 || messageId === '10'
      ? onClickRightBtns(e, 'Inbox')
      : onClickRightBtns(e, 'Sent');
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

  return (
    <div className="message__tools-right">
      {
        folder === 'Deleted' || folder === 'Spam'
          ? <RiArrowGoBackFill onClick={ (e) => onClickBack(e) } />
          :
          <>
            <RiDeleteBinFill style={{ marginRight: 3 }} title='delete' onClick={ (e) => onClickRightBtns(e, 'Deleted') } />
            <RiSpamFill title='spam' onClick={ (e) => onClickRightBtns(e, 'Spam') } />

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
                    setShowDelMenu={ setShowDelMenu } />

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
