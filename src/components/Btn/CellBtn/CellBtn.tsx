import React from 'react';
import './CellBtn.less';
import { Icon } from '@custom/Icon';
import { RightOutline } from 'antd-mobile-icons';
import { noop } from '@utillib';

interface CellBtnProps {}

/**
 * TODO:临时写个按钮吧
 * @param icon
 * @param children
 * @constructor
 */

const Icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjY2NyAwQy43NDcgMCAwIC43NDYgMCAxLjY2N3Y1LjU1NWMwIC45Mi43NDYgMS42NjcgMS42NjcgMS42NjdoNS41NTVjLjkyIDAgMS42NjctLjc0NiAxLjY2Ny0xLjY2N1YxLjY2N0M4Ljg4OS43NDcgOC4xNDMgMCA3LjIyMiAwSDEuNjY3em0xMS4xMSAwYy0uOTIgMC0xLjY2Ni43NDYtMS42NjYgMS42Njd2NS41NTVjMCAuOTIuNzQ2IDEuNjY3IDEuNjY3IDEuNjY3aDUuNTU1Yy45MiAwIDEuNjY3LS43NDYgMS42NjctMS42NjdWMS42NjdDMjAgLjc0NyAxOS4yNTQgMCAxOC4zMzMgMGgtNS41NTV6TTAgMTIuNzc4YzAtLjkyLjc0Ni0xLjY2NyAxLjY2Ny0xLjY2N2g1LjU1NWMuOTIgMCAxLjY2Ny43NDYgMS42NjcgMS42Njd2NS41NTVjMCAuOTItLjc0NiAxLjY2Ny0xLjY2NyAxLjY2N0gxLjY2N0MuNzQ3IDIwIDAgMTkuMjU0IDAgMTguMzMzdi01LjU1NXptMTIuNzc4LTEuNjY3Yy0uOTIgMC0xLjY2Ny43NDYtMS42NjcgMS42Njd2NS41NTVjMCAuOTIuNzQ2IDEuNjY3IDEuNjY3IDEuNjY3aDUuNTU1Yy45MiAwIDEuNjY3LS43NDYgMS42NjctMS42Njd2LTUuNTU1YzAtLjkyLS43NDYtMS42NjctMS42NjctMS42NjdoLTUuNTU1eiIgZmlsbD0iIzMwNDE0RCIvPjwvc3ZnPg==';

export function CellBtn({
  children = '按钮文案',
  onClick = noop,
}) {
  return (
    <div className='comp-cell-btn' onClick={onClick}>
      <img className='icon-left' src={Icon} alt='' />
      <div className='btn-text'>{children}</div>
      <img className='icon-arrow-right' src='https://qcloudimg.tencent-cloud.cn/raw/6b850bc1efb74554031c996978446679.svg' alt='' />
    </div>
  );
}
