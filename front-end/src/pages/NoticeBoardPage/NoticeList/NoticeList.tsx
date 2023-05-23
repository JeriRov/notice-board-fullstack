import React, { FC } from 'react';

import { Notice } from '../../../services/notices/noticesApi';
import { NoticeItem } from '../Notice/Notice';

interface NoticeBoardProps {
  list?: Notice[];
  onClick: (id: string | undefined) => void;
}
export const NoticeList: FC<NoticeBoardProps> = ({
  list,
  onClick: handleClick,
}) => {
  return (
    <div>
      {list?.map(notice => (
        <NoticeItem key={notice._id} notice={notice} onClick={handleClick} />
      ))}
    </div>
  );
};
