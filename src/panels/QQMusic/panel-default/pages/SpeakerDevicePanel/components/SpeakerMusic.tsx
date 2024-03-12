import React from 'react';
import { Tabs } from 'antd-mobile';
import { HomepageSongList } from './HomepageSongList';
import { TopList } from './TopList';
import { SelfSongList } from './SelfSongList';

import './SpeakerMusic.less';

function MusicSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="speaker-music-section">
      <div className="speaker-music-section__header">
        <div className="speaker-music-section__title">{title}</div>
        {desc && <div className="speaker-music__desc">{desc}</div>}
      </div>
      {children}
    </div>
  )
}

export function SpeakerMusic() {
  return (
    <Tabs stretch={false} className="speaker-music__tabs">
      <Tabs.Tab title="QQ 音乐" key="qqMusic">
        <MusicSection title="推荐歌单" desc="“小连小连，播放推荐音乐”">
          <HomepageSongList />
        </MusicSection>
        <MusicSection title="QQ 音乐排行榜" desc="“小连小连，播放排行榜音乐”">
          <TopList />
        </MusicSection>
      </Tabs.Tab>
      <Tabs.Tab title="我的歌单" key="songList">
        <SelfSongList />
      </Tabs.Tab>
    </Tabs>
  );
}
