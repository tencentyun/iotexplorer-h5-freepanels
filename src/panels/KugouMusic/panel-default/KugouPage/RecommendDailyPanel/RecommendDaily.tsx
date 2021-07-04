import React, { useContext } from 'react';
import './RecommendDaily.less';
import { MusicListItem } from '@src/panels/KugouMusic/panel-default/components/MusicListItem/MusicListItem';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/KugouPage/KugouIndex';

export function RecommendDaily() {
  const { kugouState } = useContext(KugouContext);
  const { recommendSongs: songs } = kugouState;
  return (
    <div className="panel-recommendDaily">
      <h3>每日推荐</h3>
      {
        songs.map(song => <MusicListItem key={song.song_id} song={song}/>)
      }
    </div>
  );
}
