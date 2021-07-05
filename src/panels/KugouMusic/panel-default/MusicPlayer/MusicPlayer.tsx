import React, { useContext, useEffect, useRef, useState } from 'react';
import './MusicPlayer.less';
import {
  iconNext,
  iconPre,
  iconPause,
  iconPlay,
  iconPlaylist,
  iconModeRandom,
  iconModeSingle,
  iconModeOrder, iconVolume,
} from '@icons/kugou';
import {
  controlDevice,
  controlPause,
  controlPlay,
  controlPlayMode,
  controlPlayNext, controlPlayPosition,
  controlPlayPre, controlVolume,
} from '@src/models/kugou';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';

enum PlayStatus {
  Pause = 0,
  Play = 1
}

enum PlayMode {
  Order = 0,
  Single = 1,
  Random = 2
}

function secondToMinute(s: number): string {
  const second = Math.round(s % 60);
  const minute = Math.round(s / 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

export function MusicPlayer() {
  const [curSec, setCurSec] = useState(0);
  const [totalSec, setTotalSec] = useState(0);
  const [progress, setProgress] = useState(0);

  const { kugouState, setShowPlaylistModel } = useContext(KugouContext);
  const { currentPlaySong: song, deviceData } = kugouState;
  const {
    play_position,
    pause_play,
    play_mode,
    volume,
  } = deviceData;

  useEffect(() => {
    if (!song) return;
    const totalSec = Math.round(song.duration / 1000);
    const progress = Math.round((play_position / 7200) * 100);
    const curSec = Math.round(progress * (totalSec / 100));
    setTotalSec(totalSec);
    setProgress(progress);
    setCurSec(curSec);
  }, [kugouState]);

  const getPlayStatusIcon = () => {
    if (pause_play === PlayStatus.Play) return iconPlay;
    if (pause_play === PlayStatus.Pause) return iconPause;
  };

  const getPlayModeIcon = () => {
    if (play_mode === PlayMode.Order) return iconModeOrder;
    if (play_mode === PlayMode.Single) return iconModeSingle;
    if (play_mode === PlayMode.Random) return iconModeRandom;
  };

  const handleClickPlay = () => {
    if (pause_play === PlayStatus.Play) controlDevice(controlPause);
    if (pause_play === PlayStatus.Pause) controlDevice(controlPlay);
  };

  const handleClickPreOrNext = (type: 'pre' | 'next') => {
    if (type === 'pre') controlDevice(controlPlayPre);
    if (type === 'next') controlDevice(controlPlayNext);
  };

  const handleTogglePlayMode = () => {
    let next_play_mode;
    if (play_mode === 2) {
      next_play_mode = 0;
    } else {
      next_play_mode = play_mode + 1;
    }
    controlDevice(controlPlayMode, next_play_mode);
  };

  const songProgressBarRef = useRef(null) as any;
  const volumeProgressBarRef = useRef(null) as any;

  const handleSongProgressClick = (event) => {
    event.persist();
    const progressBar = songProgressBarRef.current;
    const progress = Math.round(((event.clientX - progressBar.offsetLeft) / progressBar.offsetWidth) * 100);
    const play_position = Math.round((progress / 100) * 7200);
    controlDevice(controlPlayPosition, play_position);
  };

  const handleVolumeProgressClick = (event) => {
    event.persist();
    const progressBar = volumeProgressBarRef.current;
    const volume = Math.round(((event.clientX - progressBar.offsetLeft) / progressBar.offsetWidth) * 100);
    controlDevice(controlVolume, volume);
  };


  return (
    song ? <div className="music-player">
      <header>
        <p className="song-name">{song.song_name}</p>
        <p className="singer-name">{song.singer_name}</p>
        <div className="progress progress-volume">
          <img className="icon-volume" src={iconVolume}/>
          <p className="progress-bar" ref={volumeProgressBarRef} onClick={handleVolumeProgressClick}>
            <p className="progress-bar-fill" style={{ width: `${volume}%` }}/>
          </p>
        </div>
      </header>

      <div className="album_img">
        <img
          className="rotate"
          style={{
            animationPlayState: pause_play ? 'running' : 'paused',
          }}
          src={song.album_img_small}
        />
      </div>

      <footer>
        <div className="progress progress-song">
          <span className="start-time">{secondToMinute(curSec)}</span>
          <p className="progress-bar" ref={songProgressBarRef} onClick={handleSongProgressClick}>
            <p className="progress-bar-fill" style={{ width: `${progress}%` }}/>
          </p>
          <span className="total-time">{secondToMinute(totalSec)}</span>
        </div>
        <img className="icon-bottom" src={getPlayModeIcon()} alt="" onClick={handleTogglePlayMode}/>
        <img className="icon-bottom" src={iconPre} alt="" onClick={() => handleClickPreOrNext('pre')}/>
        <img className="icon-bottom" src={getPlayStatusIcon()} alt="" onClick={handleClickPlay}/>
        <img className="icon-bottom" src={iconNext} alt="" onClick={() => handleClickPreOrNext('next')}/>
        <img className="icon-bottom" src={iconPlaylist} onClick={() => setShowPlaylistModel(true)}/>
      </footer>
    </div> : <div className="emptyPanel">无歌曲播放</div>
  );
}
