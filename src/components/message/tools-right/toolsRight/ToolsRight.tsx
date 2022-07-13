import React, { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
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
  setIsShowModal: Dispatch<SetStateAction<boolean>>,
  setIsRead: Dispatch<SetStateAction<boolean>>,
  setIsChecked: Dispatch<SetStateAction<boolean>>,
  setIsMarked: Dispatch<SetStateAction<boolean>>,
  folderNames: string[],
  folder: string,
  isMore: boolean,
  isShowModal: boolean
};

const ToolsRight: FC<ToolsRightProps> = ({
  setFolderNames,
  setIsMore,
  setIsShowModal,
  setIsRead,
  setIsChecked,
  setIsMarked,
  folderNames,
  folder,
  isMore,
  isShowModal
}) => {

  const onClickRightBtns = (e: MouseEvent<SVGElement>, folder: string) => {
    e.stopPropagation();

    setFolderNames([]);
    setFolderNames((state) => [ ...state, folder ]);

    setIsChecked(false);
    setIsMarked(false);
  };

  const onClickMore = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsMore((state) => !state);
  };

  const onLeaveRightTools = () => {
    setIsMore(false);
    setIsShowModal(false);
  };

  return (
    <div className="message__tools-right">
      {
        folder === 'Deleted' || folder === 'Spam'
          ? <RiArrowGoBackFill onClick={ (e) => onClickRightBtns(e, 'Inbox') } />
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
                    setIsShowModal={ setIsShowModal } />

                  <FoldersModal
                    setFolderNames={ setFolderNames }
                    setIsMore={ setIsMore }
                    folderNames={ folderNames }
                    isShowModal={ isShowModal } />
              </div>
            </div>
          </>
      }
    </div>
  );
};


export default ToolsRight;
