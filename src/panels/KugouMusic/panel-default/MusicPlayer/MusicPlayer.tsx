import React, { useContext, useEffect, useRef, useState } from 'react';
import './MusicPlayer.less';
import {
  iconCurPlaylist,
  iconLike,
  iconModeOrder, iconModeOrderGrey,
  iconModeRandom, iconModeRandomGrey,
  iconModeSingle, iconModeSingleGrey,
  iconMusic,
  iconNext,
  iconPause,
  iconPlay,
  iconPre,
  iconQuality,
} from '@icons/kugou';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { PausePlayKey, PlayModeKey, PlayPositionKey } from '@src/panels/KugouMusic/panel-default/constants';
import {
  controlDevice,
  controlPause,
  controlPlay,
  controlPlayMode,
  controlPlayNext, controlPlayPosition,
  controlPlayPre, controlQuality,
} from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/components/SongListItem/SongListItem';

enum PlayStatus {
  Pause = 0,
  Play = 1
}

enum PlayModeType {
  Order = 0,
  Single = 1,
  Random = 2
}

// 弹窗遮罩
const ModelCover = props => <div className="model-cover" {...props}/>;

// 播放列表组件
const PlaylistModel = ({ PlayMode, playlist }: { PlayMode: PlayModeType, playlist: CurrentPlayQueue }) => {
  const playModeMap = {
    [PlayModeType.Order]: { icon: iconModeOrderGrey, text: '顺序播放' },
    [PlayModeType.Single]: { icon: iconModeSingleGrey, text: '单曲循环' },
    [PlayModeType.Random]: { icon: iconModeRandomGrey, text: '随机播放' },
  };
  const { songs, queueId, total } = playlist;

  return (
    <div className="playlist-model">
      <header>
        <img className="iconPlayMode" src={playModeMap[PlayMode].icon}/>
        <span>{playModeMap[PlayMode].text} ({total})</span>
      </header>
      <div className="playlist-model-list-warp">
        {
          songs.map(item => (
            <SongListItem
              key={item.song_id}
              song={item}
              queueType={'curPlayQueue'}
              newQueueId={queueId}
              curSongs={songs}
            />
          ))
        }
      </div>
    </div>
  );
};

// 推荐质量组件
const ToneQualityModel = ({ song, setShowModel }: { song: Song, setShowModel: (show: boolean) => void }) => {
  const qualityArr = song.support_quality.split(',').reverse();
  const byteToMb = byte => (byte / 1024 / 1024).toFixed(2);
  const qualityMap = {
    LQ: { text: '标准音质', sizeKey: 'song_size', value: 0 },
    HQ: { text: '高清音质', sizeKey: 'song_size_hq', value: 1 },
    SQ: { text: '无损音质', sizeKey: 'song_size_sq', value: 2 },
  };
  return (
    <div className="quality-model">
      {
        qualityArr.map((item, index) => (
          <div className="quality-item" key={index} onClick={async () => {
            await controlDevice(controlQuality, qualityMap[item].value);
            setShowModel(false);
          }}>
            {qualityMap[item].text}({byteToMb(song[qualityMap[item].sizeKey])}M)
          </div>
        ))
      }
      <div className="cancel" onClick={() => setShowModel(false)}>取消</div>
    </div>
  );
};

export const MusicPlayer = () => {
  const progressRef = useRef(null);
  // 播放进度 0-100
  const [progress, setProgress] = useState(80);
  // 当前播放进度的宽度
  const [curProgressWidth, setCurProgressWidth] = useState(0);
  // 切换音质model
  const [showQualityModel, setShowQualityModel] = useState(false);
  // 播放列表model
  const [showPlaylistModel, setShowPlaylistModel] = useState(false);
  const { kugouState } = useContext(KugouContext);
  const { currentPlaySong: song, deviceData, currentPlayQueue: playlist } = kugouState;

  const PlayPosition = deviceData[PlayPositionKey];
  const PlayMode = deviceData[PlayModeKey];
  const PausePlay = deviceData[PausePlayKey];

  useEffect(() => {
    if (!song) return;
    const totalTime = Math.round(song.duration / 1000);
    const progress = Math.round((PlayPosition / totalTime) * 100);
    if (progress > 100) {
      setProgress(100);
      return;
    }
    setProgress(progress);
  }, [kugouState]);

  useEffect(() => {
    const maxPosition = (progressRef.current as any).offsetWidth;
    setCurProgressWidth(Math.round(maxPosition * (progress / 100)));
  }, [progress]);

  /**
   * 滑动播放进度条处理
   */
  const handleCurProgress = (event, progressRef) => {
    event.persist();
    const progress = progressRef.current;
    const { offsetLeft, offsetWidth: maxPosition } = progress;
    const curPosition = event.touches[0].clientX - offsetLeft;
    if (curPosition <= maxPosition && curPosition >= 0) {
      setProgress(Math.round((curPosition / maxPosition) * 100));
    }
  };
  const onProgressTouchStart = (event) => {
    handleCurProgress(event, progressRef);
  };
  const onProgressTouchMove = (event) => {
    handleCurProgress(event, progressRef);
  };
  const onProgressTouchEnd = () => {
    if (!song) return;
    // 下发控制命令
    const totalTime = Math.round(song.duration / 1000);
    const play_position = Math.round((progress / 100) * totalTime);
    controlDevice(controlPlayPosition, play_position);
  };

  /**
   * 播控按钮Icon切换
   */
  const getPlayStatusIcon = () => {
    if (PausePlay === PlayStatus.Play) return iconPlay;
    if (PausePlay === PlayStatus.Pause) return iconPause;
  };
  const getPlayModeIcon = () => {
    if (PlayMode === PlayModeType.Order) return iconModeOrder;
    if (PlayMode === PlayModeType.Single) return iconModeSingle;
    if (PlayMode === PlayModeType.Random) return iconModeRandom;
  };

  // 切换播放模式
  const handleTogglePlayMode = () => {
    let next_play_mode;
    if (PlayMode === 2) {
      next_play_mode = 0;
    } else {
      next_play_mode = PlayMode + 1;
    }
    controlDevice(controlPlayMode, next_play_mode);
  };

  // 播放暂停
  const handleClickPlay = () => {
    if (PausePlay === PlayStatus.Play) controlDevice(controlPause);
    if (PausePlay === PlayStatus.Pause) controlDevice(controlPlay);
  };

  // 上一首下一首
  const handleClickPreOrNext = (type: 'pre' | 'next') => {
    if (type === 'pre') controlDevice(controlPlayPre);
    if (type === 'next') controlDevice(controlPlayNext);
  };

  return (
    <div
      className="music-player-warp bgi-active"
      style={{
        backgroundImage: (song && PausePlay === PlayStatus.Play) ? `url(${song.album_img_medium})` : '',
      }}
    >
      <main style={{
        backdropFilter: song ? 'blur(72px)' : '',
      }}>
        <p className="top-song-name">{song ? song.song_name : '歌曲'}</p>
        {song && <p className="top-singer-name">歌手：{song.singer_name}</p>}
        <div className="album-view">
          <div className="album-outline-1"/>
          <div className="album-outline-2"/>
          <div className="album-outline-3"/>
          <div className="album-outline-4"/>
          <div className="album-outline-5"/>
          <div className="album-outline-6"/>
          <div className="album-outline-7"/>
          <div className="album-outline-8"/>
          {
            song ? <img className="album-center album-center-img" src={song.album_img}/>
              : <>
                <div className="album-center"/>
                <img className="iconMusic" src={iconMusic}/>
              </>
          }
        </div>
        <div className="more-like-icon">
          <img className="iconQuality" src={iconQuality} onClick={() => {
            if (!song) return;
            setShowQualityModel(true);
          }}/>
          <img className="iconLike" src={iconLike}/>
        </div>
        <p
          className="progress"
          ref={progressRef}
          onTouchStart={onProgressTouchStart}
          onTouchMove={onProgressTouchMove}
          onTouchEnd={onProgressTouchEnd}
        >
          <span className="progress-dot" style={{ left: `${curProgressWidth}px` }}/>
          <p className="progress-finish" style={{ width: `${curProgressWidth}px` }}/>
        </p>
        <div className="bottom-control">
          <img className="iconPlayMode" src={getPlayModeIcon()} onClick={handleTogglePlayMode}/>
          <img className="iconPre" src={iconPre} onClick={() => handleClickPreOrNext('pre')}/>
          <img className="iconPlay" src={getPlayStatusIcon()} onClick={handleClickPlay}/>
          <img className="iconNext" src={iconNext} onClick={() => handleClickPreOrNext('next')}/>
          <img className="iconCurPlaylist" src={iconCurPlaylist} onClick={() => setShowPlaylistModel(true)}/>
        </div>
      </main>
      {showQualityModel && song && <ToneQualityModel song={song} setShowModel={setShowQualityModel}/>}
      {showPlaylistModel && playlist && <PlaylistModel PlayMode={PlayMode} playlist={playlist}/>}
      {(showQualityModel || showPlaylistModel)
      && <ModelCover
        onClick={() => {
          setShowQualityModel(false);
          setShowPlaylistModel(false);
        }}
      />}
    </div>
  );
};
