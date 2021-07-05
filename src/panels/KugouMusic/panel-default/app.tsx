import React, { useReducer, useState } from 'react';
import { entryWrap } from '@src/entryWrap';
import './style.less';
import { HashRouter, Route } from 'react-router-dom';
import { KugouIndex } from './KugouPage/KugouIndex';
import { MusicPlayer } from '@src/panels/KugouMusic/panel-default/KugouPage/MusicPlayer/MusicPlayer';
import { MusicListPage } from '@src/panels/KugouMusic/panel-default/KugouPage/MusicListPage/MusicListPage';
declare type Reducer = (state: KugouState, action: ReducerAction<KugouStateAction>) => KugouState;

export const enum KugouStateAction {
  UpdateCurrentPlayQueue = 'UpdateCurrentPlayQueue',
  UpdateCurrentPlaySong = 'UpdateCurrentPlaySong',
  UpdateRecommendSongs = 'UpdateRecommendSongs',
  UpdateRecommendPlaylists = 'UpdateRecommendPlaylists',
  UpdateAlbums = 'UpdateAlbums',
  UpdateDeviceData = 'UpdateDeviceData'
}

function kugouInitState(sdk): KugouState {
  return {
    recommendSongs: [],
    recommendPlaylists: [],
    albums: [],
    showPlaylistModel: false,
    currentPlayQueue: { songs: [], queueId: '' },
    currentPlaySong: null,
    deviceData: Object.assign({}, sdk.deviceData),
  };
}

export function reducer(state: KugouState, action: ReducerAction<KugouStateAction>): KugouState {
  const { type, payload } = action;
  console.log('action => ', type, payload);
  console.log('prev state => ', state);
  const nextState = (() => {
    switch (type) {
      case KugouStateAction.UpdateRecommendSongs: {
        return {
          ...state,
          recommendSongs: payload,
        };
      }
      case KugouStateAction.UpdateRecommendPlaylists: {
        return {
          ...state,
          recommendPlaylists: payload,
        };
      }
      case KugouStateAction.UpdateAlbums: {
        return {
          ...state,
          albums: payload,
        };
      }
      case KugouStateAction.UpdateCurrentPlaySong: {
        return {
          ...state,
          currentPlaySong: payload,
        };
      }
      case KugouStateAction.UpdateDeviceData: {
        const updateDeviceData = {} as KugouDeviceData;
        for (const key in payload) {
          updateDeviceData[key] = payload[key].Value;
        }
        return {
          ...state,
          deviceData: Object.assign({}, state.deviceData, updateDeviceData),
        };
      }
      case KugouStateAction.UpdateCurrentPlayQueue: {
        return {
          ...state,
          currentPlayQueue: {
            songs: payload.songs,
            queueId: payload.queueId,
          },
        };
      }
    }
    return state;
  })();
  console.log('next state => ', nextState);
  return nextState;
}

export const KugouContext = React.createContext({} as KugouContext);

function App() {
  const sdk = window.h5PanelSdk;
  const [kugouState, dispatch] = useReducer<Reducer, any>(reducer, sdk, kugouInitState);
  const [showPlaylistModel, setShowPlaylistModel] = useState(false);
  return (
    <KugouContext.Provider value={{
      kugouState,
      dispatch,
      showPlaylistModel,
      setShowPlaylistModel,
    }}>
      <HashRouter>
        <div className="kugou-warp">
          <Route exact path={'/'} component={KugouIndex}/>
          <Route path={'/musicPlayer'} component={MusicPlayer}/>
          <Route path={'/musicList'} component={MusicListPage}/>
        </div>
      </HashRouter>
    </KugouContext.Provider>
  );
}

entryWrap(App);
