import React, { useContext, useState } from 'react';
import { Slider } from 'antd-mobile';
import { MusicPlayerContext } from '../../../context';
import { PlayMode, PlayStatus, PrevNextActionType, deviceControlPreNext, deviceGetPausePlay, deviceGetPlayMode, deviceGetRawSongList, deviceGetSongId, deviceGetSongList, deviceGetVolume, devicePlaySong, deviceSetPausePlay, deviceSetPlayMode, deviceSetPlayPosition } from '../../../deviceController';
import { useRealPlayPosition } from '../../../hooks/useRealPlayPosition';
import { useQQMusicSongInfo } from '../../../hooks/useQQMusicSongInfo';

import './CurrentPlaying.less';

function EmptySong() {
  return (
    <>
      <div className="current-playing-song">
        <div className="current-playing-song__cover" />
        <div className="current-playing-song__title">未在播放</div>
        <div className="current-playing-song__artist"></div>
      </div>
      <div className="current-playing-song__empty-desc">
        试试和音箱说“小连小连，播放音乐”
      </div>
    </>
  );
}

function ProgressControl({
  playPosition,
  duration: durationInt,
  setPlayPosition,
}: {
  playPosition: number | null;
  duration: number;
  setPlayPosition: (position: number) => void;
}) {
  const [tempPlayPosition, setTempPlayPosition] = useState<number | null>(null);

  const clampedPlayPosition = playPosition === null
    ? null
    : Math.min(durationInt, Math.max(0, playPosition));

  return (
    <Slider
      step={1}
      min={0}
      max={durationInt}
      value={tempPlayPosition !== null ? tempPlayPosition : (clampedPlayPosition || 0)}
      onChange={(value) => {
        setTempPlayPosition(value as number);
      }}
      onAfterChange={(value) => {
        setTempPlayPosition(null);
        setPlayPosition(value as number);
      }}
      popover={false}
      icon={<></>}
    />
  );
}

const playModeIconMap: Record<PlayMode, string> = {
  [PlayMode.Loop]: 'loop',
  [PlayMode.Random]: 'random',
  [PlayMode.Sequence]: 'sequence',
};

const nextPlayModeMap: Record<PlayMode, PlayMode> = {
  [PlayMode.Loop]: PlayMode.Random,
  [PlayMode.Random]: PlayMode.Sequence,
  [PlayMode.Sequence]: PlayMode.Loop,
};

function PlayerControl({
  playStatus,
  playMode,
  setPlayStatus,
  setPlayMode,
  switchPrevSong,
  switchNextSong,
  switchPlayList,
}: {
  playStatus: PlayStatus;
  playMode: PlayMode;
  setPlayStatus: (playStatus: PlayStatus) => void;
  setPlayMode: (playMode: PlayMode) => void;
  switchPrevSong: () => void;
  switchNextSong: () => void;
  switchPlayList: () => void;
}) {
  return (
    <div className="current-playing-control">
      <div className="current-playing-control__item" onClick={() => setPlayMode(nextPlayModeMap[playMode])}>
        <i className={`current-playing-control__icon-${playModeIconMap[playMode]}`} />
      </div>
      <div className="current-playing-control__item" onClick={switchPrevSong}>
        <i className="current-playing-control__icon-prev" />
      </div>
      <div className="current-playing-control__item" onClick={() => setPlayStatus(playStatus === PlayStatus.Pause ? PlayStatus.Play : PlayStatus.Pause)}>
        {playStatus === PlayStatus.Pause && <i className="current-playing-control__icon-play" />}
        {playStatus === PlayStatus.Play && <i className="current-playing-control__icon-pause" />}
      </div>
      <div className="current-playing-control__item" onClick={switchNextSong}>
        <i className="current-playing-control__icon-next" />
      </div>
      <div className="current-playing-control__item" onClick={switchPlayList}>
        <i className="current-playing-control__icon-playlist" />
      </div>
    </div>
  );
}

function PlayingSong({
  songId,
  switchPlayList,
}: {
  songId: number;
  switchPlayList: () => void;
}) {
  const { deviceState } = useContext(MusicPlayerContext);
  const { deviceData } = deviceState;

  const { data: songInfo, loading, error } = useQQMusicSongInfo(songId);
  const duration = songInfo && songInfo.SongPlayTime ? songInfo.SongPlayTime : 0;

  // 播放模式（顺序播放、随机播放等）
  const playMode = deviceGetPlayMode(deviceData);
  // 设备是否正在播放
  const playStatus = deviceGetPausePlay(deviceData);
  // 根据时间推算的实际播放进度
  const realPlayPosition = useRealPlayPosition(deviceState);

  const setPlayPosition = (playPosition: number) => {
    deviceSetPlayPosition(playPosition);
  };

  const setPlayMode = (playMode: PlayMode) => {
    deviceSetPlayMode(playMode);
  };

  const switchPrevNext = (prevOrNext: PrevNextActionType) => {
    deviceControlPreNext(prevOrNext);
  };

  const setPlayStatus = (playStatus: PlayStatus) => {
    deviceSetPausePlay(playStatus);
  };

  return (
    <>
      <div className="current-playing-song">
        <div className="current-playing-song__cover" style={{ backgroundImage: songInfo?.AlbumPic ? `url(${songInfo?.AlbumPic})` : undefined }} />
        <div className="current-playing-song__title">{songInfo?.SongTitle || '加载中'}</div>
        <div className="current-playing-song__artist">- {songInfo?.SingerName || '...'}</div>
      </div>
      <ProgressControl
        playPosition={realPlayPosition}
        duration={duration}
        setPlayPosition={setPlayPosition}
      />
      <PlayerControl
        playStatus={playStatus}
        playMode={playMode}
        setPlayMode={setPlayMode}
        setPlayStatus={setPlayStatus}
        switchPrevSong={() => switchPrevNext(PrevNextActionType.Prev)}
        switchNextSong={() => switchPrevNext(PrevNextActionType.Next)}
        switchPlayList={switchPlayList}
      />
    </>
  );
}

export function CurrentPlaying({
  onOpenPlayList,
}: {
  onOpenPlayList: () => void;
}) {
  const { playingSongId } = useContext(MusicPlayerContext);

  return (
    <div className="current-playing">
      {playingSongId ? <PlayingSong songId={playingSongId} switchPlayList={() => onOpenPlayList()} /> : <EmptySong />}
    </div>
  );
}
