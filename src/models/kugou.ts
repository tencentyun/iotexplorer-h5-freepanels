import Toast from '@src/panels/KugouMusic/panel-default/components/Toast/Toast';

let tmeSdk: TMESDK;

export function setTMESdk(sdk: TMESDK) {
  tmeSdk = sdk;
}

export function checkLoginAuth() {
  return tmeSdk.checkDeviceAuth();
}

export function login() {
  return tmeSdk.login();
}

export function activateDevice() {
  return tmeSdk.activateDevice();
}

export function getRecommendDaily() {
  return tmeSdk.requestTMEApi('awesome_everyday');
}

export function getRecommendPlayList(page: number, size: number) {
  return tmeSdk.requestTMEApi('playlist_awesome', {
    page,
    size,
  });
}

export function getSingerAlbums(page: number, size: number, singer_id: string, sort: number) {
  return tmeSdk.requestTMEApi('singer_album', {
    page,
    size,
    singer_id,
    sort,
  });
}

export function getSongsByAlbum(page: number, size: number, album_id: string) {
  return tmeSdk.requestTMEApi('album_info', {
    page,
    size,
    album_id,
  });
}

export function getSongsByPlaylist(page: number, size: number, playlist_id: string) {
  return tmeSdk.requestTMEApi('playlist_song', {
    page,
    size,
    playlist_id,
  });
}

export function getSongUrl(song_id: string) {
  return tmeSdk.requestTMEApi('song_url', {
    song_id,
  });
}

export function getSongsInfo(songs_id) {
  return tmeSdk.requestTMEApi('song_infos', {
    songs_id,
  });
}

export async function getSongData(song_id: string) {
  return tmeSdk.getSongData(song_id);
}

export async function getCurrentPlaySong() {
  return tmeSdk.getCurrentPlaySong();
}

export function getNewSongs(page: number, size: number, top_id: number) {
  return tmeSdk.requestTMEApi('awesome_newsong', {
    page,
    size,
    top_id,
  });
}

export function controlCurrentPlayQueue(playType: 'playlist' | 'album' | 'newSongs' | 'recommendSongs', params: any) {
  return tmeSdk.setCurrentPlayQueue(playType, params);
}

export function getCurrentPlayQueue() {
  return tmeSdk.getCurrentPlayQueue();
}

export function controlSetCurSongId(song_id: string) {
  return tmeSdk.setCurSongId(song_id);
}

export function controlPlayNext() {
  return tmeSdk.nextSong();
}

export function controlPlayPre() {
  return tmeSdk.preSong();
}

export function controlPlay() {
  return tmeSdk.play();
}

export function controlPause() {
  return tmeSdk.pause();
}

export function controlSongIdAndIndex(song_id: string, song_index: number) {
  return tmeSdk.controlKugouDeviceData({
    cur_song_id: song_id,
    song_index,
  });
}

export function controlPlayMode(play_mode: 0 | 1 | 2) {
  return tmeSdk.setPlayMode(play_mode);
}

export function controlPlayPosition(play_position: number) {
  return tmeSdk.setPlayPosition(play_position);
}

export function controlVolume(volume: number) {
  return tmeSdk.setVolume(volume);
}

export function controlQuality(quality: 0 | 1 | 2) {
  return tmeSdk.setPlayQuality(quality);
}

export async function controlDevice(controlFn: (...args) => Promise<any>, ...args) {
  if (window.h5PanelSdk.deviceStatus === 0) {
    Toast.open('设备已离线，暂时不能播放哦~');
    return Promise.reject();
  }
  window.h5PanelSdk.tips.showLoading('同步设备中');
  try {
    const res = await controlFn(...args);
    window.h5PanelSdk.tips.hideLoading();
    return res;
  } catch (err) {
    console.error('控制设备出错', err);
    window.h5PanelSdk.tips.hideLoading();
    window.h5PanelSdk.tips.alert(err.error_msg);
    return Promise.reject();
  }
}
