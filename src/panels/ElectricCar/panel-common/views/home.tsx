/*
 * @Description: 电动车首页
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getThemeType } from '@libs/theme';
import { Cell } from '@components/base';
import {
  HeaderBlock,
  SettingBlock,
  StatusBlock
} from '../components';

export function Home() {
  const themeType = getThemeType();
  const history = useHistory();

  // 跳转页面
  const handleUnlock = () => {
    history.push('/unlock');
  };

  return (
    <main className="electric-car">
      {/* 顶部 */}
      <HeaderBlock></HeaderBlock>
      {/* 开/关按钮 */}
      <StatusBlock></StatusBlock>

      {themeType === 'dark' || themeType === 'morandi' ? (
        <div className="decoration-block">
          <SettingBlock></SettingBlock>

          <footer className="footer">
            <Cell title="无感解锁" size="medium" onClick={handleUnlock}></Cell>
          </footer>
        </div>
      ) : (
        <>
          <SettingBlock></SettingBlock>
          {themeType === 'blueWhite'&& 
            <footer className="footer-block-blueWhite">
              <Cell title="无感解锁" size="medium" onClick={handleUnlock}></Cell>
            </footer>
          }
          {themeType !== 'blueWhite'&& 
            <footer className="footer-block">
              <Cell title="无感解锁" size="medium" onClick={handleUnlock}></Cell>
            </footer>
          }
        </>
      )}
    </main>
  );
}
