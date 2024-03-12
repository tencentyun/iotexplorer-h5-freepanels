import { QQMusicPlayListType } from './lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const enum PlayMode {
  Sequence = 0,
  Loop = 1,
  Random = 2,
}

export const enum MusicQuality {
  Standard = 0,
  HD = 1,
  Lossless = 2,
}

export const enum PlayStatus {
  Pause = 0,
  Play = 1,
}

export const enum PrevNextActionType {
  Stay = 0,
  Prev = 1,
  Next = 2,
}

export const deviceSetPlayMode = (mode: PlayMode): Promise<void> => {
  return sdk.controlDeviceData({ _sys_play_mode: mode });
};

export const deviceSetPlayPosition = (position: number): Promise<void> => {
  return sdk.controlDeviceData({ _sys_play_position: position });
};

export const deviceSetVolume = (volume: number): Promise<void> => {
  return sdk.controlDeviceData({ _sys_volume: volume });
};

export const deviceSetPausePlay = (pausePlay: PlayStatus): Promise<void> => {
  return sdk.controlDeviceData({ _sys_pause_play: pausePlay });
};

export const deviceSetSongList = (songList: {
  songListId: number;
  songListType: QQMusicPlayListType;
  songList: number[];
}): Promise<void> => {
  return sdk.controlDeviceData({ _sys_song_list: JSON.stringify(songList) });
};

export const deviceSetSongId = (songId: number): Promise<void> => {
  return sdk.controlDeviceData({ _sys_song_id: songId });
};

const callDeviceActionAsync = async (data: Record<string, unknown> | string, actionId: string) => {
  let inputParams = data;
  if (typeof inputParams !== 'string') {
    try {
      inputParams = JSON.stringify(inputParams);
    } catch (err) {
      /* noop */
    }
  }

  const res = await sdk.requestTokenApi('AppCallDeviceActionAsync', {
    ActionId: actionId,
    InputParams: inputParams,
    DeviceId: sdk.deviceId,
  });

  if (res.Status === 'FailedOperation.ActionUnreachable') {
    throw new Error(`action发送失败:${res.Status}`);
  }
  return res;
}

export const deviceControlPreNext = (preOrNext: PrevNextActionType): Promise<void> => {
  return callDeviceActionAsync({ pre_or_next: preOrNext }, '_sys_pre_next');
};

export const deviceGetPlayMode = (deviceData: any): PlayMode => {
  return deviceData._sys_play_mode || PlayMode.Sequence as PlayMode;
};

export const deviceGetPlayPosition = (deviceData: any): number => {
  return deviceData._sys_play_position || 0 as number;
};

export const deviceGetRawSongList = (deviceData: any): string => {
  return deviceData._sys_song_list || '{}' as string;
};

export const deviceGetSongList = (deviceData: any): {
  songListId: number;
  songListType: QQMusicPlayListType;
  songList: number[];
} => {
  const json = deviceGetRawSongList(deviceData);
  try {
    const obj = JSON.parse(json);
    const result: {
      songListId: number;
      songListType: QQMusicPlayListType;
      songList: number[];
    } = {
      songListId: 0,
      songListType: QQMusicPlayListType.Song,
      songList: [],
    };

    if (!obj || typeof obj !== 'object') {
      throw new Error('song list is not an object');
    }

    if (Number.isSafeInteger(obj.songListId)) {
      result.songListId = obj.songListId;
    }

    if (Number.isSafeInteger(obj.songListType)) {
      result.songListType = obj.songListType;
    }

    if (Array.isArray(obj.songList)) {
      result.songList = obj.songList
        .filter((item: unknown) => Number.isSafeInteger(item));
    }

    return result;
  } catch (error) {
    console.error('parse song list fail', error);
    return {
      songListId: 0,
      songListType: QQMusicPlayListType.Song,
      songList: [],
    };
  }
};

export const deviceGetSongId = (deviceData: any): number => {
  return deviceData._sys_song_id || 0 as number;
};

export const deviceGetVolume = (deviceData: any): number => {
  return deviceData._sys_volume === undefined ? 50 : deviceData._sys_volume as number;
};

export const devicePlaySong = (songId: number, playPosition = 0): Promise<void> => {
  return sdk.controlDeviceData({
    _sys_song_id: songId,
    _sys_play_position: playPosition,
    _sys_pause_play: 1,
  });
};

export const deviceGetPausePlay = (deviceData: any): PlayStatus => {
  return deviceData._sys_pause_play || PlayStatus.Pause as PlayStatus;
};
