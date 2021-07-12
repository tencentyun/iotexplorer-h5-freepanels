declare interface Window {
  h5PanelSdk: any
}

declare interface TMEResponse {
  error_code: number,
  error_msg: string,
  data?: any,
}

declare interface TMESDK {
  requestKugouApi: (action: string, params?: any) => Promise<TMEResponse>;

  login: () => Promise<TMEResponse>;
  getUserInfo: () => Promise<TMEResponse>;
  logout: () => Promise<TMEResponse>;
  checkDeviceAuth: () => Promise<TMEResponse>;

  play: () => Promise<TMEResponse>;
  pause: () => Promise<TMEResponse>;
  preSong: () => Promise<TMEResponse>;
  nextSong: () => Promise<TMEResponse>;
  setPlayMode: (playMode: 0 | 1 | 2) => Promise<TMEResponse>;
  setVolume: (volume: number) => Promise<TMEResponse>;
  setCurSongId: (song_id: string) => Promise<TMEResponse>;
  setPlayQuality: (quality: 0 | 1 | 2) => Promise<TMEResponse>;
  setCurPlayList: (action: string, params?: any) => Promise<TMEResponse>;
  setPlayPosition: (play_position: number) => Promise<TMEResponse>;
}

declare interface Song {
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

declare interface Playlist {
  playlist_id: string;
  playlist_name: string;
  pic: string;
  update_time: string;
  create_time: string;
  intro: string;
}


declare interface Album {
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

declare interface KugouContext {
  kugouState: KugouState;
  dispatch: any;
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
}


// declare interface CurrentPlaySong extends Song{
//   curSec: number;
//   totalSec: number;
//   processPercent: number;
//   playStatus: 0 | 1;
// }

declare interface KugouDeviceData {
  play_pause: 0 | 1;
  cur_play_list: any;
  pre_next: 0 | 1 | 2;
  play_mode: 0 | 1 | 2;
  volume: number;
  play_position: number;
  cur_song_id: string;
  recommend_quality: 0 | 1 | 2;
  control_seq: number;
  song_index: number;
}

declare interface KugouState {
  recommendSongs: Song[];
  recommendPlaylists: Playlist[];
  albums: Album[];
  newSongs: Song[];
  showPlaylistModel: boolean;
  currentPlayQueue: CurrentPlayQueue;
  currentPlaySong: Song | null;
  deviceData: KugouDeviceData;
}

declare interface CurrentPlayQueue {
  songs: Song[];
  queueId: string;
  total: number;
}
