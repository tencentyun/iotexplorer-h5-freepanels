import {
  CONTROL_SEQ_KEY,
  CUR_PLAYLIST_KEY, CUR_SONG_ID_KEY,
  PAUSE_PLAY_KEY,
  PLAY_MODE_KEY, PLAY_POSITION_KEY,
  PRE_NEXT_KET, RECOMMEND_QUALITY_KEY, SONG_INDEX_KEY, VOLUME_KEY,
} from '@src/panels/KugouMusic/panel-default/constants';

export interface KugouDeviceData {
  [PAUSE_PLAY_KEY]: 0 | 1;
  [CUR_PLAYLIST_KEY]: any;
  [PRE_NEXT_KET]: 0 | 1 | 2;
  [PLAY_MODE_KEY]: 0 | 1 | 2;
  [VOLUME_KEY]: number;
  [PLAY_POSITION_KEY]: number;
  [CUR_SONG_ID_KEY]: string;
  [RECOMMEND_QUALITY_KEY]: 0 | 1 | 2;
  [CONTROL_SEQ_KEY]: number;
  [SONG_INDEX_KEY]: number;
}

export interface TMEResponse {
  error_code: number,
  error_msg: string,
  data?: any,
}

export interface TMESDK {
  requestTMEApi: (action: string, params?: any) => Promise<TMEResponse>;

  login: () => Promise<TMEResponse>;
  getUserInfo: () => Promise<TMEResponse>;
  logout: () => Promise<TMEResponse>;
  checkDeviceAuth: () => Promise<TMEResponse>;
  activateDevice: () => Promise<TMEResponse>;

  play: () => Promise<TMEResponse>;
  pause: () => Promise<TMEResponse>;
  preSong: () => Promise<TMEResponse>;
  nextSong: () => Promise<TMEResponse>;
  setPlayMode: (playMode: 0 | 1 | 2) => Promise<TMEResponse>;
  setVolume: (volume: number) => Promise<TMEResponse>;
  setCurSongId: (song_id: string) => Promise<TMEResponse>;
  setPlayQuality: (quality: 0 | 1 | 2) => Promise<TMEResponse>;
  setPlayPosition: (play_position: number) => Promise<TMEResponse>;
  setCurrentPlayQueue: (playType: 'playlist' | 'album' | 'newSongs' | 'recommendSongs', params: any) => Promise<TMEResponse>;
  getCurrentPlayQueue: () => Promise<TMEResponse>;
  getCurrentPlaySong: () => Promise<TMEResponse>;
  getSongDetail: (song_id: string) => Promise<TMEResponse>;
  setSongIndex: (song_index: number) => Promise<TMEResponse>;
  controlKugouDeviceData: (deviceData: any) => Promise<TMEResponse>;
  playSong: (songId, songIndex, playQueueId, playQueueType) => Promise<TMEResponse>;
}

export interface Song {
  singer_img: string;
  album_img: string;
  album_img_mini: string;
  album_img_small: string;
  album_img_medium: string;
  language: string;
  is_vip_song: -1 | 0 | 1;
  mv_id: string;
  has_accompany: -1 | 0 | 1;
  song_id: string;
  song_name: string;
  singer_id: string;
  singer_name: string;
  album_id: string;
  album_name: string;
  playable_code: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 9;

  song_url: string;
  song_size: string;
  song_url_hq: string;
  song_size_hq: string;
  song_url_sq: string;
  song_size_sq: string;
  duration: number;
  try_url: string;
  try_size: number;
  try_begin: number;
  try_end: number;

  try_playable: 0;
  topic_url: string;
  highest_quality: string;
  support_quality: string;
}

export interface Playlist {
  playlist_id: string;
  playlist_name: string;
  pic: string;
  update_time: string;
  create_time: string;
  intro: string;
}


export interface Album {
  album_id: string;
  album_name: string;
  album_translate_name: string;
  album_img: string;
  album_img_mini: string;
  album_img_small: string;
  album_img_medium: string;
  intro: string;
  company: string;
  singer_id: string;
  singer_name: string;
  publish_time: string;
}

export interface IKugouContext {
  kugouState: KugouState;
  dispatch: any;
  setShowPlayFloat: (showPlayFloat: boolean) => void;
}

export interface KugouState {
  recommendSongs: Song[];
  recommendPlaylists: Playlist[];
  albums: Album[];
  newSongs: Song[];
  showPlaylistModel: boolean;
  currentPlayQueue: CurrentPlayQueue;
  currentPlaySong: Song | null;
  deviceData: KugouDeviceData;
}

export interface CurrentPlayQueue {
  songs: Song[];
  queueId: string;
  total: number;
  playType: 'album' | 'playlist' | 'newSongs' | 'recommendDaily';
}

export enum PlayType {
  Playlist = 'playlist',
  NewSongs = 'newSongs',
  RecommendDaily = 'recommendDaily',
}
