import React, { useContext, useEffect, useRef, useState } from 'react';
import './MusicPlayer.less';
import * as Icons from '@icons/kugou';
import { KugouContext, KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';
import {
  PAUSE_PLAY_KEY,
  PLAY_MODE_KEY,
  PLAY_POSITION_KEY,
  RECOMMEND_QUALITY_KEY,
} from '@src/panels/KugouMusic/panel-default/constants';
import {
  controlDevice,
  controlPause,
  controlPlay,
  controlPlayMode,
  controlPlayNext,
  controlPlayPosition,
  controlPlayPre,
  controlQuality,
  getNewSongs,
  getSongsByPlaylist,
  getSongsInfo,
} from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/SongsPage/components/SongListItem/SongListItem';
import Toast from '@src/panels/KugouMusic/panel-default/components/Toast/Toast';
import classNames from 'classnames';
import { onScrollToBottomLoad } from '@src/panels/KugouMusic/panel-default/utils/onScrollToBottomLoad';
import { Song } from '@src/panels/KugouMusic/panel-default/types';

export const musicDefaultImg = 'https://qzonestyle.gtimg.cn/qzone/qzact/act/external/iot/h5panel/release/music.png';

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
const PlaylistModel = () => {
  const { dispatch, kugouState } = useContext(KugouContext);
  const { currentPlayQueue, deviceData } = kugouState;
  const PlayMode = deviceData[PLAY_MODE_KEY];
  const playModeMap = {
    [PlayModeType.Order]: { icon: Icons.iconModeOrderGrey, text: '顺序播放' },
    [PlayModeType.Single]: { icon: Icons.iconModeSingleGrey, text: '单曲循环' },
    [PlayModeType.Random]: { icon: Icons.iconModeRandomGrey, text: '随机播放' },
  };
  const { songs, queueId, total, playType } = currentPlayQueue;

  const [curPage, setCurPage] = useState(2);

  return (
    <div className="playlist-model">
      <header>
        <img className="iconPlayMode" src={playModeMap[PlayMode].icon}/>
        <span>{playModeMap[PlayMode].text} {total ? `(${total})` : `(${songs.length})`}</span>
      </header>
      <div className="playlist-model-list-warp" onScroll={onScrollToBottomLoad(async () => {
        switch (playType) {
          case 'recommendDaily':
            return;
          case 'playlist': {
            const res1 = await getSongsByPlaylist(curPage, 10, queueId);
            const { songs } = res1.data;
            if (songs.length === 0) return;
            const songsId = songs.map(item => item.song_id);
            const res2 = await getSongsInfo(songsId);
            setCurPage(curPage + 1);
            dispatch({
              type: KugouStateAction.UpdateCurrentPlayQueue,
              payload: {
                ...currentPlayQueue,
                songs: [...currentPlayQueue.songs, ...res2.data.songs],
              },
            });
            return;
          }
          case 'newSongs': {
            const res = await getNewSongs(curPage, 10, Number(queueId));
            const { songs } = res.data;
            if (songs.length === 0) return;
            setCurPage(curPage + 1);
            dispatch({
              type: KugouStateAction.UpdateCurrentPlayQueue,
              payload: {
                ...currentPlayQueue,
                songs: [...currentPlayQueue.songs, ...res.data.songs],
              },
            });
          }
        }
      })}>
        {
          songs.map((item, index) => (
            <SongListItem
              key={item.song_id}
              song={item}
              playType={currentPlayQueue.playType}
              newQueueId={queueId}
              songIndex={index}
            />
          ))
        }
      </div>
    </div>
  );
};

interface ToneQualityModelProps {
  song: Song;
  curQuality: number;
  setShowModel: (show: boolean) => void;
}

// 推荐质量组件
const ToneQualityModel = ({ song, setShowModel, curQuality }: ToneQualityModelProps) => {
  const qualityArr = song.support_quality.split(',')
    .reverse();
  const byteToMb = byte => (byte / 1024 / 1024).toFixed(2);
  const qualityMap = {
    LQ: { text: '标准音质', sizeKey: 'song_size', value: 0, urlKey: 'song_url' },
    HQ: { text: '高清音质', sizeKey: 'song_size_hq', value: 1, urlKey: 'song_url_hq' },
    SQ: { text: '无损音质', sizeKey: 'song_size_sq', value: 2, urlKey: 'song_url_sq' },
  };
  return (
    <div className="quality-model">
      {
        qualityArr.map((item, index) => (
          <div className="quality-item" key={index} onClick={async () => {
            // 判断音质对应song_url是否存在
            if (song[qualityMap[item].urlKey] === '') {
              Toast.open('暂时无法切换高清/无损音质哦~');
              return;
            }
            // 下发命令
            await controlDevice(controlQuality, qualityMap[item].value);
            setShowModel(false);
          }}>
            <span className="quality-text">
              {qualityMap[item].text} ({byteToMb(song[qualityMap[item].sizeKey])}M)
              {item !== 'LQ' && <span className="vipIcon">VIP</span>}
            </span>

            {curQuality === qualityMap[item].value && <img className="iconSelect" src={Icons.iconSelect}/>}
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
  const [progress, setProgress] = useState(0);
  // 当前播放进度的宽度
  const [curProgressWidth, setCurProgressWidth] = useState(0);
  // 切换音质model
  const [showQualityModel, setShowQualityModel] = useState(false);
  // 播放列表model
  const [showPlaylistModel, setShowPlaylistModel] = useState(false);
  const { kugouState, setShowPlayFloat } = useContext(KugouContext);
  const { currentPlaySong: song, deviceData } = kugouState;

  const PlayPosition = deviceData[PLAY_POSITION_KEY];
  const PlayMode = deviceData[PLAY_MODE_KEY];
  const PausePlay = deviceData[PAUSE_PLAY_KEY];
  const CurQuality = deviceData[RECOMMEND_QUALITY_KEY];

  useEffect(() => {
    setShowPlayFloat(false);
    return () => {
      setShowPlayFloat(true);
    };
  }, []);

  useEffect(() => {
    if (!song) return;
    const totalTime = Math.floor(song.duration / 1000);
    const progress = Math.floor((PlayPosition / totalTime) * 100);
    if (progress > 100) {
      setProgress(100);
      return;
    }
    setProgress(progress);
  }, [kugouState]);

  useEffect(() => {
    const maxPosition = (progressRef.current as any).offsetWidth;
    setCurProgressWidth(Math.floor(maxPosition * (progress / 100)));
  }, [progress]);

  /**
   * 判断是vip歌曲，并且song_url为空
   */
  const isTrySong = () => song?.is_vip_song === 1 && song?.song_url === '';

  /**
   * 滑动播放进度条处理
   */
  const handleCurProgress = (event, progressRef) => {
    event.persist();
    const progress = progressRef.current;
    const { offsetLeft, offsetWidth: maxPosition } = progress;
    const curPosition = event.touches[0].clientX - offsetLeft;
    if (curPosition <= maxPosition && curPosition >= 0) {
      setProgress(Math.floor((curPosition / maxPosition) * 100));
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
    const totalTime = Math.floor(song.duration / 1000);
    const play_position = Math.floor((progress / 100) * totalTime);
    // 判断试听歌曲
    if (isTrySong() && play_position > 60) {
      Toast.open('VIP歌曲仅支持试听60s');
    }
    controlDevice(controlPlayPosition, play_position);
  };

  /**
   * 播控按钮Icon切换
   */
  const getPlayStatusIcon = () => {
    if (PausePlay === PlayStatus.Play) return Icons.iconPlay;
    if (PausePlay === PlayStatus.Pause) return Icons.iconPause;
  };
  const getPlayModeIcon = () => {
    if (PlayMode === PlayModeType.Order) return Icons.iconModeOrder;
    if (PlayMode === PlayModeType.Single) return Icons.iconModeSingle;
    if (PlayMode === PlayModeType.Random) return Icons.iconModeRandom;
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

  /**
   * 开始时间
   */
  const getTotalTime = () => {
    if (!song) return '00:00';
    const duration = song.duration as number;
    let minute = Math.floor((duration / 1000) / 60) as number | string;
    let second = Math.floor((duration / 1000) % 60) as number | string;
    if (second < 10) second = `0${second}`;
    if (minute < 10) minute = `0${minute}`;
    return `${minute}:${second}`;
  };

  /**
   * 结束时间
   */
  const getCurTime = () => {
    let minute = Math.floor(PlayPosition / 60) as number | string;
    let second = Math.floor(PlayPosition % 60) as number | string;
    if (second < 10) second = `0${second}`;
    if (minute < 10) minute = `0${minute}`;
    return `${minute}:${second}`;
  };
  return (
    <div className={classNames(['music-player-warp', {
      'bgi-pause': !song || PausePlay !== PlayStatus.Play,
    }])}>
      {/* 播放状态=模糊背景 */}
      {(PausePlay === PlayStatus.Play) && <div className="bgi-play" style={{
        backgroundImage: `url(${song?.album_img_medium})`,
      }}/>}

      {song
      && <>
        <p className="top-song-name">{song?.song_name}</p>
        <p className="top-singer-name">歌手：{song.singer_name}</p>
        <div className="album-view">
          <div className="album-outline-1"/>
          <div className="album-outline-2"/>
          <div className="album-outline-3"/>
          <div className="album-outline-4"/>
          <div className="album-outline-5"/>
          <div className="album-outline-6"/>
          <div className="album-outline-7"/>
          <div className="album-outline-8"/>
          <img className="album-center album-center-img" src={song.album_img}/>
        </div>
      </>
      }
      {!song && <div className="album-view-empty">
        <img src={musicDefaultImg} alt=""/>
      </div>}
      <div className="more-like-icon">
        <img className="iconQuality" src={Icons.iconQuality} onClick={() => {
          if (!song) return;
          setShowQualityModel(true);
        }}/>
        <img className="iconLike" src={Icons.iconLike}/>
      </div>
      {/* 播放进度 */}
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
      {/*  播放时间 */}
      <div className="time-view">
        <div>{getCurTime()}</div>
        <div>{getTotalTime()}</div>
      </div>
      {/* 底部播控 */}
      <div className="bottom-control">
        <img className="iconPlayMode" src={getPlayModeIcon()} onClick={handleTogglePlayMode} alt=""/>
        <img className="iconPre" src={Icons.iconPre} onClick={() => handleClickPreOrNext('pre')} alt=""/>
        <img className="iconPlay" src={getPlayStatusIcon()} onClick={handleClickPlay} alt=""/>
        <img className="iconNext" src={Icons.iconNext} onClick={() => handleClickPreOrNext('next')} alt=""/>
        <img className="iconCurPlaylist" src={Icons.iconCurPlaylist} onClick={() => setShowPlaylistModel(true)} alt=""/>
      </div>
      {
        showQualityModel && song
        && <ToneQualityModel song={song} setShowModel={setShowQualityModel} curQuality={CurQuality}/>}
      {
        showPlaylistModel && <PlaylistModel/>
      }
      {
        (showQualityModel || showPlaylistModel)
        && <ModelCover
          onClick={() => {
            setShowQualityModel(false);
            setShowPlaylistModel(false);
          }}
        />
      }
    </div>
  );
};

