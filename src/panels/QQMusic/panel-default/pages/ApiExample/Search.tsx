import React, { useContext, useState } from 'react';
import { Input, Button, Selector } from 'antd-mobile';
import { useQQMusicSearchSong } from '../../hooks/useQQMusicSearchSong';
import { SongEntry } from '../../components/SongEntry';
import { describeError, withResult } from '../../utils';
import { MusicPlayerContext } from '../../context';
import { QQMusicPlayListType, QQMusicSearchType } from '../../lib/qqMusicTypes';
import { PlayListEntry } from '../../components/PlayListEntry';

import './Search.less';

const windowHeight = window.innerHeight || document.documentElement.clientHeight;

export function Search() {
  const { onPlaySingleSong } = useContext(MusicPlayerContext);

  const [inputValue, setInputValue] = useState('');
  const [selectTypeValue, setSelectTypeValue] = useState(QQMusicSearchType.Song);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(QQMusicSearchType.Song);

  const {
    data: songSearchResult,
    loading,
    loadingMore,
    error,
    loadMore,
    noMore,
  } = useQQMusicSearchSong(
    searchType,
    searchValue
  );

  const renderSearchResult = () => {
    if (!searchValue) {
      return null;
    }

    if (loading) {
      return <div>加载中...</div>;
    }

    if (error) {
      return <div>{describeError(error)}</div>;
    }

    if (!songSearchResult || songSearchResult.length === 0) {
      return <div>没有搜索到符合条件的结果</div>;
    }

    const play = (songId: number) => {
      withResult(onPlaySingleSong(songId));
    };

    let list = null;

    switch (searchType) {
      case QQMusicSearchType.Song: {
        list = songSearchResult.map((song) => (
          <SongEntry
            key={song.SongId}
            songId={song.SongId}
            title={song.SongTitle}
            artist={song.SingerName}
            coverUrl={song.AlbumPic}
            onClick={() => {
              play(song.SongId);
            }}
            unplayableCode={song.UnplayableCode}
            hasTryPlay={!!song.Try30SUrl}
            unplayableMsg={song.UnplayableMsg}
          />
        ));
        break;
      }

      case QQMusicSearchType.Album: {
        list = songSearchResult.map((album) => (
          <PlayListEntry
            key={album.AlbumId}
            id={album.AlbumId}
            type={QQMusicPlayListType.Album}
            title={album.AlbumName}
            coverUrl={album.AlbumPic}
            desc={album.SingerName}
          />
        ));
        break;
      }
    }

    return (
      <div>
        {list}
        {!loadingMore && !!error && (
          <div>{describeError(error)}</div>
        )}
        {!loadingMore && !noMore && (
          <div><Button fill="outline" block onClick={loadMore}>加载更多</Button></div>
        )}
        {loadingMore && (
          <div>加载中...</div>
        )}
      </div>
    );
  };

  return (
    <div
      className="common-page-container"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <div className="page-title">搜索</div>
      <div className="search__input-container">
        <Selector
          options={[
            { label: '歌曲', value: QQMusicSearchType.Song },
            { label: '专辑', value: QQMusicSearchType.Album },
          ]}
          value={[
            selectTypeValue,
          ]}
          onChange={(arr) => {
            setSelectTypeValue(arr[0]);
          }}
        />
      </div>
      <div className="search__input-container">
        <Input className="search__input" value={inputValue} onChange={(value) => setInputValue(value)} />
        <Button className="search__button" fill="outline" size="small" onClick={() => {
          setSearchType(selectTypeValue);
          setSearchValue(inputValue);
        }}>搜索</Button>
      </div>
      <div className="search__result">
        {renderSearchResult()}
      </div>
    </div>
  );
}
