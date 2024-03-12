export interface QQMusicSongInfo {
  SongId: number;
  SongMid: string;
  SongName: string;
  SongTitle: string;
  IsOnly: number;
  Vip: number;
  Language: string;
  Genre: string;
  PublicTime: string;
  SongPlayTime: number;
  IsDigitalAlbum: number;
  Copyright: number;
  Hot: number;
  Playable: number;
  SongH5Url: string;
  MvId: number;
  MvVid: string;
  KSongId: number;
  KSongMid: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTitle: string;
  SingerPic: string;
  SingerPic150X150: string;
  SingerPic300X300: string;
  SingerPic500X500: string;
  OtherSingerList: {
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerTitle: string;
    SingerPic: string;
  }[];
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  AlbumTitle: string;
  AlbumPic: string;
  AlbumPic150X150: string;
  AlbumPic300X300: string;
  AlbumPic500X500: string;
  SongPlayUrl: string;
  SongPlayUrlStandard: string;
  SongPlayUrlHq: string;
  SongPlayUrlSq: string;
  SongSize: number;
  SongSizeStandard: number;
  SongSizeHq: number;
  SongSizeSq: number;
  TryPlayable: number;
  TryBegin: number;
  TryEnd: number;
  Try30SUrl: string;
  TryFileSize: number;
  UnplayableCode: number;
  UnplayableMsg: string;
  UserOwnRule: number;
  SongVersion: number;
  WeightPlayCnt: number;
  FNote: number;
  EditAllow: number;
  SongPlayUrlDolby: string;
  SongSizeDolby: number;
  Action: {
    Switch: number;
    Switch2: number;
    PlayAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    DownloadAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    CacheAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
  };
  SongEkeyStandard: string;
  SongEkeyHq: string;
  SongEkeySq: string;
  SongEkeyDolby: string;
  Extra: Record<string, unknown>;
  SongEkeyXq: string;
  SongPlayUrlXq: string;
  SongSizeXq: number;
  SongTypeDolby: string;
  Bpm: number;
  LimitFree: number;
  ShouldPay: number;
  PayPrice: number;
  VolumeGain: number;
  VolumePeak: number;
  VolumeLra: number;
  PayStatus: number;
  SongPlayUrlPq: string;
  SongEkeyPq: string;
  SongSizePq: number;
  SongTypePq: string;
}

export interface QQMusicSyncSongEntry {
  UserOwnRule: number;
  SongId: number;
  SongPlayTime: number;
  SongURL: string;
  SongName: string;
  SingerName: string;
}

export interface QQMusicSyncSongListReq {
  ProductId: string;
  DeviceName: string;
  Id: string;
  Name: string;
  Type: QQMusicPlayListType;
  Quality: QQMusicQualityType;
  Total: number;
  Page: number;
  PageSize: number;
  SongList: QQMusicSyncSongEntry[];
  PlaySongId: number;
}

export interface QQMusicSelfSongList {
  /** 歌单修改时间 */
  UpdateTime: number;
  /** 歌单创建时间 */
  CreateTime: number;
  /** 歌单ID */
  DissId: number;
  /** 歌单名 */
  DissName: string;
  /** 歌单封面 */
  DissPic: string;
  /** 歌单歌曲数量 */
  SongNum: number;
  /** 歌单收听数量 */
  ListenNum: number;
}

export interface DescribeSongListReq {
  DissId: number;
  Page: number;
  PageSize: number;
}

export interface DescribeSongListResp {
  DissId: number;
  Hot: number;
  DissTitle: string;
  PicUrl: string;
  TotalNum: number;
  OwnerFlag: number;
  SongList: QQMusicSongInDiss[];
}

export interface QQMusicSongInDiss {
  SongId: number;
  SongName: string;
  SongTitle: string;
  SongMid: string;
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  SongPlayTime: number;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  QQMusicFlag: number;
  UserOwnRule: number;
  OpiPlayFlag: number;
  SongType: number;
}

export const enum QQMusicQualityType {
  /** 流畅 */
  FQ = 1,
  /** 标准 */
  STANDARD = 2,
  /** 高品质 */
  HQ = 4,
  /** 超品质 */
  SQ = 8,
  /** Hi-Res */
  XQ = 16,
  /** 杜比 */
  DOLBY = 32,
  /** 母带 */
  FLYRA = 64,
  /** 臻品全景声 */
  ATMOS = 128,
}

export const enum QQMusicPlayListType {
  /** 歌单 */
  SongList = 5,
  /** 歌曲 */
  Song = 6,
  /** 电台 */
  Radio = 7,
  /** 榜单 */
  Rank = 8,
  /** 专辑 */
  Album = 9,
  /** 歌手 */
  Singer = 10,
  /** 推荐 */
  Recommend = 12,
  /** 免登录专区 */
  NoLoginArea = 14,
}

export interface DescribeMVListReq {
  /** MV 类型（0：获取最新 MV；1：获取最热 MV）*/
  MVType: number;
  /** MV 标签（0：推荐；12：内地；9：韩国；13：港台；3：欧美；8：日本） */
  MVTag: number;
}

export interface QQMusicMVItem {
  Id: number;
  Vid: string;
  Title: string;
  Subtitle: string;
  PicURL: string;
  Duration: number;
  PlayCnt: number;
  CommentCnt: number;
}

export interface QQMusicSearchMusicItem {
  /** 表示用户拥有接口的权限。0：只浏览；1：可播放 */
  UserOwnRule: number;
  /** 专辑id */
  AlbumId: number;
  /** 专辑mid */
  AlbumMid: string;
  /** 专辑名 */
  AlbumName: string;
  /** 专辑封面 */
  AlbumPic: string;
  /** 图片规格150x150专辑封面 */
  AlbumPic150X150: string;
  /** 图片规格300x300专辑封面 */
  AlbumPic300X300: string;
  /** 图片规格500x500专辑封面 */
  AlbumPic500X500: string;
  /** 流派 */
  Genre: string;
  /** 1：表示独家，0：表示非独家 */
  IsOnly: number;
  /** K歌id */
  KSongId: number;
  /** K歌mid。若user_own_rule=0，则取值为0或空 */
  KSongMid: string;
  /** 语言 */
  Language: string;
  /** 1：表示能播放，0：表示不能播放 */
  Playable: number;
  /** 歌手id */
  SingerId: string;
  /** 歌手mid */
  SingerMid: string;
  /** 歌手图片 */
  SingerPic: string;
  /** 歌手名 */
  SingerName: string;
  /** 试听开始位置，单位ms。若user_own_rule=0，则取值为0或空 */
  TryBegin: number;
  /** 试听结束位置，单位ms。若user_own_rule=0，则取值为0或空 */
  TryEnd: number;
  /** 试听流媒体大小，单位byte。若user_own_rule=0，则取值为0或空 */
  TryFileSize: number;
  /** 试听权限，1：表示有试听权限，0：表示没有。若user_own_rule=0，则取值为0或空 */
  TryPlayable: number;
  /** 试听流媒体url。若user_own_rule=0，则取值为0或空 */
  Try30SUrl: string;
  /** 播放总时间。若user_own_rule=0，则取值为0或空 */
  SongPlayTime: number;
  /** H5分享页面url。若user_own_rule=0，则取值为0或空 */
  SongH5Url: string;
  /** 歌曲id */
  SongId: number;
  /** 歌曲mid */
  SongMid: string;
  /** 歌曲名 */
  SongName: string;
  /** 歌曲标题 */
  SongTitle: string;
  /** 流畅品质流媒体url。若user_own_rule=0，则取值为0或空 */
  SongPlayUrl: string;
  /** 标准品质流媒体url。若user_own_rule=0，则取值为0或空 */
  SongPlayUrlStandard: string;
  /** 高品质流媒体url。若user_own_rule=0，则取值为0或空 */
  SongPlayUrlHq: string;
  /** 无损品质流媒体url。若user_own_rule=0，则取值为0或空 */
  SongPlayUrlSq: string;
  /** 流畅品质流媒体大小，单位字节。若user_own_rule=0，则取值为0或空 */
  SongSize: number;
  /** 标准品质流媒体大小，单位字节。若user_own_rule=0，则取值为0或空 */
  SongSizeStandard: number;
  /** 高品质流媒体大小，单位字节。若user_own_rule=0，则取值为0或空 */
  SongSizeHq: number;
  /** 无损品质流媒体大小，单位字节。若user_own_rule=0，则取值为0或空 */
  SongSizeSq: number;
  /** 若user_own_rule=0，则取值为0或空 */
  MvId: number;
  /** 曲作者 */
  Author: string;
  /** 该字段标识不能播放的原因代码，如下文解释 */
  UnplayableCode: number;
  /** 不能播放原因描述语 */
  UnplayableMsg: string;
  /** 1：vip歌曲，0：普通歌曲 */
  Vip: number;
  /** 是否是数字专辑，0不是 1是 */
  IsdigitalAlbum: number;
  /** 单曲搜索时，如果时歌词召回的，返回匹配到的歌词 */
  MatchLyric: string;
  /** 1：原唱，0：其他 */
  Origin: number;
}

export interface SearchMusicReq {
  /** 搜索词 */
  KeyWord: string;
  /** 搜索类型 0：单曲搜索 8：专辑搜索 12：mv搜索 15：电台 */
  SearchType: QQMusicSearchType;
  /** 单曲、专辑、mv、歌单搜索页码（最大4页，默认第1页） */
  Page: number;
  /** 单曲、专辑、mv、歌单搜索页长（最大50，默认20个） */
  Num: number;
}

export const enum QQMusicSearchType {
  /** 单曲 */
  Song = 0,
  /** 专辑 */
  Album = 8,
  /** MV搜索 */
  MV = 12,
  /** 电台 */
  Radio = 15,
}

export interface SearchMusicResp {
  /** 当前返回个数 */
  CurNum: number;
  /** 当前页码 */
  CurPage: number;
  /** 该搜索词可以搜到的总结果数 */
  TotalNum: number;
  /** 搜索词 */
  Keyword: string;
  /** 单曲列表 */
  List: QQMusicSearchMusicItem[];
  /**  */
  DirectInfo: QQMusicDirectInfo;
}

/** 歌曲直达信息 */
export interface QQMusicDirectInfo {
  /** 根据type确定 */
  Id: number;
  /** 直达类型 1：歌手 2：专辑 4：歌单 9：排行榜 其他可暂不处理 */
  Type: number;
  /** 标题 */
  Title: string;
  /** 副标题 */
  SubTitle: string;
  /** type对应的图片 */
  Pic: string;
}

export interface QQMusicFreeSongGroupItem {
  SongList: {
    SongId: number;
    SongMid: string;
    SongTitle: string;
    Vip: number;
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    TryPlayable: number;
    SongPlayTime: number;
    Playable: number;
    UnplayableCode: number;
    AlbumId: number;
    AlbumMid: string;
    AlbumTitle: string;
    AlbumPic: string;
    AlbumPic300X300: string;
    AlbumPic500X500: string;
    SongToken: string;
  }[];
  Number: number;
  Name: string;
  Pic: string;
  BannerPic: string;
}

export interface DescribeFreeSongInfoReq {
  /** 歌曲id */
  SongId: number;
  /** 歌曲播放token（跟appid、songid对应，有效期30天) */
  SongToken: string;
}

export interface QQMusicFreeSongInfo {
  SongId: number;
  SongMid: string;
  SongName: string;
  SongTitle: string;
  IsOnly: number;
  Vip: number;
  Language: string;
  Genre: string;
  PublicTime: string;
  SongPlayTime: number;
  IsDigitalAlbum: number;
  Copyright: number;
  Hot: number;
  Playable: number;
  SongH5Url: string;
  MvId: number;
  MvVid: string;
  KSongId: number;
  KSongMid: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTitle: string;
  SingerPic: string;
  SingerPic150X150: string;
  SingerPic300X300: string;
  SingerPic500X500: string;
  OtherSingerList: {
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerTitle: string;
    SingerPic: string;
  }[];
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  AlbumTitle: string;
  AlbumPic: string;
  AlbumPic150X150: string;
  AlbumPic300X300: string;
  AlbumPic500X500: string;
  SongPlayUrl: string;
  SongPlayUrlStandard: string;
  SongPlayUrlHq: string;
  SongPlayUrlSq: string;
  SongSize: number;
  SongSizeStandard: number;
  SongSizeHq: number;
  SongSizeSq: number;
  TryPlayable: number;
  TryBegin: number;
  TryEnd: number;
  Try30SUrl: string;
  TryFileSize: number;
  UnplayableCode: number;
  UnplayableMsg: string;
  UserOwnRule: number;
  SongVersion: number;
  WeightPlayCnt: number;
  FNote: number;
  EditAllow: number;
  SongPlayUrlDolby: string;
  SongSizeDolby: number;
  Action: {
    Switch: number;
    Switch2: number;
    PlayAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    DownloadAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    CacheAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
  };
  SongEkeyStandard: string;
  SongEkeyHq: string;
  SongEkeySq: string;
  SongEkeyDolby: string;
  Extra: Record<string, unknown>;
  SongEkeyXq: string;
  SongPlayUrlXq: string;
  SongSizeXq: number;
  SongTypeDolby: string;
  Bpm: number;
}

export interface DescribeMVReq {
  /** mv id，多个id用逗号分割(最大值50) */
  MVId: string;
  /** mv vid，多个id用逗号分割(最大值50) */
  MVVid: string;
}

export interface QQMusicMVInfo {
  /** 蓝光流媒体大小 */
  MvBlueRaySize: number;
  /** 蓝光流媒体url */
  MvBlueRayURL: string;
  /** 高清流媒体大小 */
  MvHQSize: number;
  /** 高清流媒体url */
  MvHQUrl: string;
  /** 低品质流媒体大小 */
  MvLQSize: number;
  /** 低品质流媒体url */
  MvLQUrl: string;
  /** 超清流媒体大小 */
  MvSQSize: number;
  /** 超清流媒体url */
  MvSQUrl: string;
  /** Mv的文件id */
  MVFileid: string;
  /** Mv的id */
  MvId: number;
  /** 播放时长 */
  MvPlayTime: number;
  /** Mv的标题 */
  MvTitle: string;
  /** Mv的vid */
  MvVid: string;
  /** Mv图片url */
  PicUrl: string;
  /** 播放权限 */
  Playable: number;
  /** 发布时间 */
  PublicTime: string;
  /** 歌手id */
  SingerId: number;
  /** 歌手mid */
  SingerMid: string;
  /** 歌手名 */
  SingerName: string;
  /** Mv的歌手集合 */
  Singers: {
    /** 歌手id */
    Id: number;
    /** 歌手mid */
    Mid: string;
    /** 歌手名 */
    Name: string;
  }[];
  /** 不能播放权限阻断码 */
  UnplayableCode: number;
}

export interface SearchSingerListReq {
  /** 搜索关键字 */
  Keyword: string;
  /** 分页索引，从1开始，最大2页 */
  Page: number;
  /** 每页歌手数目，默认10，最大为20 */
  PageSize: number;
}

export interface QQMusicSearchSingerItem {
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerPic: string;
  AlbumNum: string;
  SongNum: string;
}

export interface DescribeSingerReq {
  /** 歌手id，只支持单次拉取 */
  SingerId: number;
  /** 分页索引，从0开始 */
  Page: number;
  /** 每页歌曲数目，最大为50，需大于0 */
  PageSize: number;
  /** 歌曲排序方式，0：表示按时间(默认)，1：表示按热度 */
  Order: number;
  /** 是否需要歌手wiki信息 */
  Wiki: number;
}

export interface QQMusicSingerInfo {
  Area: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerPic: string;
  SingerTranslatorName: string;
  SongSum: number;
  SongList: {
    UserOwnRule: number;
    AlbumId: number;
    AlbumMid: string;
    AlbumName: string;
    AlbumPic: string;
    Genre: string;
    IsOnly: number;
    KSongId: number;
    KSongMid: string;
    Language: string;
    Playable: number;
    PublicTime: string;
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerPic: string;
    SizeTry: number;
    SongH5Url: string;
    SongId: number;
    SongMid: string;
    SongName: string;
    SongPlayTime: number;
    SongPlayUrl: string;
    SongPlayUrlHq: string;
    SongPlayUrlSq: string;
    SongPlayUrlStandard: string;
    SongSize: number;
    SongSizeHq: number;
    SongSizeSq: number;
    SongSizeStandard: number;
    TryBegin: number;
    TryEnd: number;
    IsDigitalAlbum: number;
  }[];
}

export interface DescribeSingerListReq {
  /** -100：全部 200 ：内地 2：港台 3：韩国 4：日本 5：欧美 */
  Area: number;
  /** -100：全部  0：男 1：女 2：组合 */
  Type: number;
  /** -100：全部 1：流行 2：摇滚 3：民谣 4：电子 5：爵士 6：嘻哈 8：R&B 9：轻音乐 10：民歌 14：古典 19：国风 20：蓝调 25：乡村 */
  Genre: number;
}

export interface QQMusicPopularSingerItem {
  Country: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTranslatorName: string;
}

export interface OperateSquareSongListReq {
  /** 操作的歌单id */
  DissId: number;
  /** 1：收藏，2：取消收藏，3：获取收藏歌单 */
  Op: number;
}

export interface OperateSquareSongListResp {
  Data: QQMusicSelfSongList[];
}

export interface DescribeLyricResp {
  SongId: number;
  SongLyric: string;
  SongTranslateEncLyric: string;
  SongRomeEncLyric: string;
  SongQrcEncLyric: string;
}

export interface DescribeRecentPlayReq {
  /** tab类型，1：全部，2：歌曲，3：专辑，4：歌单 */
  Type: number;
  /** 最近更新时间，由接口下发（见返回数据），客户端传入以增量获取数据，减少返回数据量，初始可传0 */
  UpdateTime: number;
}

export interface DescribeRecentPlayResp {
  Data: {
    All: Array<{
      Type: number;
      TypeName: string;
      LastTime: number;
      Detail: {
        Comm: {
          Title: string;
          Pic: string;
          Count: number;
        };
        Album: {
          Title: string;
          Mid: string;
          Singer: string;
          Count: number;
          Pic: string;
          Pic150X150: string;
          Pic300X300: string;
          Pic500X500: string;
          Id: number;
          LastTime: number;
        };
        Playlist: {
          Title: string;
          Id: number;
          Creator: string;
          Count: number;
          Pic: string;
          LastTime: number;
        };
      };
    }>;
    Song: Array<{
      Title: string;
      Mid: string;
      Singer: string[];
      AlbumTitle: string;
      IsOnly: number;
      Size320Mp3: number;
      SizeFlac: number;
      ListenCount: number;
      SubTitle: string;
      Id: number;
      Vip: number;
      LastTime: number;
    }>;
    Album: Array<{
      Title: string;
      Mid: string;
      Singer: string;
      Count: number;
      Pic: string;
      Pic150X150: string;
      Pic300X300: string;
      Pic500X500: string;
      Id: number;
      LastTime: number;
    }>;
    Playlist: Array<{
      Title: string;
      Id: number;
      Creator: string;
      Count: number;
      Pic: string;
      LastTime: number;
    }>;
  };
  UpdateTime: number;
}

export interface ReportRecentPlayReq {
  /** 资源id */
  ResourceId: number;
  /** 资源类型，2：歌曲，3：专辑，4：歌单 */
  Type: number;
}

export interface DescribeNewTrackReq {
  /** 12：内地；9：韩国；13：港台；3：欧美；8：日本；1：最新 */
  Tag: number;
}

export interface QQMusicNewTrackSongItem {
  SongId: number;
  SongMid: string;
  SongName: string;
  SongTitle: string;
  IsOnly: number;
  Vip: number;
  Language: string;
  Genre: string;
  PublicTime: string;
  SongPlayTime: number;
  IsDigitalAlbum: number;
  Copyright: number;
  Hot: number;
  Playable: number;
  SongH5Url: string;
  MvId: number;
  MvVid: string;
  KSongId: number;
  KSongMid: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTitle: string;
  SingerPic: string;
  SingerPic150X150: string;
  SingerPic300X300: string;
  SingerPic500X500: string;
  OtherSingerList: {
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerTitle: string;
    SingerPic: string;
  }[];
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  AlbumTitle: string;
  AlbumPic: string;
  AlbumPic150X150: string;
  AlbumPic300X300: string;
  AlbumPic500X500: string;
  SongPlayUrl: string;
  SongPlayUrlStandard: string;
  SongPlayUrlHq: string;
  SongPlayUrlSq: string;
  SongSize: number;
  SongSizeStandard: number;
  SongSizeHq: number;
  SongSizeSq: number;
  TryPlayable: number;
  TryBegin: number;
  TryEnd: number;
  Try30SUrl: string;
  TryFileSize: number;
  UnplayableCode: number;
  UnplayableMsg: string;
  UserOwnRule: number;
  SongVersion: number;
  WeightPlayCnt: number;
  FNote: number;
  EditAllow: number;
  SongPlayUrlDolby: string;
  SongSizeDolby: number;
  Action: {
    Switch: number;
    Switch2: number;
    PlayAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    DownloadAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    CacheAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
  };
  SongEkeyStandard: string;
  SongEkeyHq: string;
  SongEkeySq: string;
  SongEkeyDolby: string;
  Extra: Record<string, unknown>;
  SongEkeyXq: string;
  SongPlayUrlXq: string;
  SongSizeXq: number;
  SongTypeDolby: string;
  Bpm: number;
  LimitFree: number;
  ShouldPay: number;
  PayPrice: number;
  VolumeGain: number;
  VolumePeak: number;
  VolumeLra: number;
  PayStatus: number;
  SongPlayUrlPq: string;
  SongEkeyPq: string;
  SongSizePq: number;
  SongTypePq: string;
}

export interface DescribeHomepageSongListReq {
  /** 机器码;序列号;唯一标识 */
  SN: string;
  /** 要获取的内容类型.200-单曲;500-歌单.可多选如 200,500 */
  Type: string;
}

export interface DescribeHomepageSongListResp {
  ShelfArr: {
    Title: string;
    CardArr: {
      Type: number;
      Id: string;
      Title: string;
      Subtitle: string;
      Cover: string;
      Cnt: number;
      SubId: string;
      FavCnt: number;
    }[];
  }[];
  RcItemArr: {
    DirId: number;
    DirName: string;
    DissId: number;
    AlbumPicUrl: string;
  }[];
}

export interface QQMusicIndividualRadioSongItem {
  SongId: number;
  SongMid: string;
  SongName: string;
  SongTitle: string;
  Isonly: number;
  Vip: number;
  Language: string;
  Genre: string;
  PublicTime: string;
  SongPlayTime: number;
  IsdigitalAlbum: number;
  Copyright: number;
  Hot: number;
  Playable: number;
  SongH5Url: string;
  MvId: number;
  MvVid: string;
  KSongId: number;
  KSongMid: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTitle: string;
  SingerPic: string;
  SingerPic150X150: string;
  SingerPic300X300: string;
  SingerPic500X500: string;
  OtherSingerList: {
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerTitle: string;
    SingerPic: string;
  }[];
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  AlbumTitle: string;
  AlbumPic: string;
  AlbumPic150X150: string;
  AlbumPic300X300: string;
  AlbumPic500X500: string;
  SongPlayUrl: string;
  SongPlayUrlStandard: string;
  SongPlayUrlHq: string;
  SongPlayUrlSq: string;
  SongSize: number;
  SongSizeStandard: number;
  SongSizeHq: number;
  SongSizeSq: number;
  TryPlayable: number;
  TryBegin: number;
  TryEnd: number;
  Try30SUrl: string;
  TryFileSize: number;
  UnplayableCode: number;
  UnplayableMsg: string;
  UserOwnRule: number;
  SongVersion: number;
  WeightPlayCnt: number;
  Fnote: number;
  EditAllow: number;
  SongPlayUrlDolby: string;
  SongSizeDolby: number;
  Action: {
    Switch: number;
    Switch2: number;
  };
  SongEkeyStandard: string;
  SongEkeyHq: string;
  SongEkeySq: string;
  SongEkeyDolby: string;
  Extra: Record<string, unknown>;
}

export interface QQMusicDailySongItem {
  SongId: number;
  SongMid: string;
  SongName: string;
  SongTitle: string;
  Isonly: number;
  Vip: number;
  Language: string;
  Genre: string;
  PublicTime: string;
  SongPlayTime: number;
  IsdigitalAlbum: number;
  Copyright: number;
  Hot: number;
  Playable: number;
  SongH5Url: string;
  MvId: number;
  MvVid: string;
  KSongId: number;
  KSongMid: string;
  SingerId: number;
  SingerMid: string;
  SingerName: string;
  SingerTitle: string;
  SingerPic: string;
  SingerPic150X150: string;
  SingerPic300X300: string;
  SingerPic500X500: string;
  OtherSingerList: {
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerTitle: string;
    SingerPic: string;
  }[];
  AlbumId: number;
  AlbumMid: string;
  AlbumName: string;
  AlbumTitle: string;
  AlbumPic: string;
  AlbumPic150X150: string;
  AlbumPic300X300: string;
  AlbumPic500X500: string;
  SongPlayUrl: string;
  SongPlayUrlStandard: string;
  SongPlayUrlHq: string;
  SongPlayUrlSq: string;
  SongSize: number;
  SongSizeStandard: number;
  SongSizeHq: number;
  SongSizeSq: number;
  TryPlayable: number;
  TryBegin: number;
  TryEnd: number;
  Try30SUrl: string;
  TryFileSize: number;
  UnplayableCode: number;
  UnplayableMsg: string;
  UserOwnRule: number;
  SongVersion: number;
  WeightPlayCnt: number;
  Fnote: number;
  EditAllow: number;
  SongPlayUrlDolby: string;
  SongSizeDolby: number;
  Action: {
    Switch: number;
    Switch2: number;
    PlayAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    DownloadAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
    CacheAccess: {
      FQ: number;
      STANDARD: number;
      HQ: number;
      SQ: number;
      XQ: number;
      DOLBY: number;
      FLYRA: number;
      ATMOS: number;
    };
  };
  SongEkeyStandard: string;
  SongEkeyHq: string;
  SongEkeySq: string;
  SongEkeyDolby: string;
  Extra: {
    Abt: string;
    Cmd: string;
    Tf: string;
    Trace: string;
    UniqueTraceId: string;
  };
  SongEkeyXq: string;
  SongPlayUrlXq: string;
  SongSizeXq: number;
  SongTypeDolby: string;
  Bpm: number;
  LimitFree: number;
  ShouldPay: number;
  PayPrice: number;
  VolumeGain: number;
  VolumePeak: number;
  VolumeLra: number;
  PayStatus: number;
  SongPlayUrlPq: string;
  SongEkeyPq: string;
  SongSizePq: number;
  SongTypePq: string;
}

export interface QQMusicTopListGroupItem {
  GroupId: number;
  GroupName: string;
  GroupTopList: {
    ListenNum: number;
    ShowTime: string;
    SongList: {
      Rank: number;
      SingerId: number;
      SingerMid: string;
      SingerName: string;
      SongId: number;
      SongMid: string;
      SongName: string;
    }[];
    TopBannerPic: string;
    TopHeaderPic: string;
    TopId: number;
    TopName: string;
    TopType: number;
    TotalNum: number;
  }[];
  GroupType: number;
}

export interface DescribeTopListInfoReq {
  TopId: number;
  Page: number;
  PageSize: number;
}

export interface DescribeTopListInfoResp {
  ListenNum: number;
  SongList: {
    UserOwnRule: number;
    AlbumId: number;
    AlbumMid: string;
    AlbumName: string;
    AlbumPic: string;
    Genre: string;
    Hot: number;
    IsOnly: number;
    KSongId: number;
    KSongMid: string;
    Language: string;
    Playable: number;
    PublicTime: string;
    SingerId: number;
    SingerMid: string;
    SingerName: string;
    SingerPic: string;
    SongH5Url: string;
    SongId: number;
    SongMid: string;
    SongName: string;
    SongPlayTime: number;
    SongPlayUrl: string;
    SongPlayUrlHq: string;
    SongPlayUrlSq: string;
    SongPlayUrlStandard: string;
    SongSize: number;
    SongSizeHq: number;
    SongSizeSq: number;
    SongSizeStandard: number;
    TopRankIncrease: number;
    TryBegin: number;
    TryEnd: number;
    IsDigitalAlbum: number;
  }[];
  TopBannerPic: string;
  TopDesc: string;
  TopHeaderPic: string;
  TopId: number;
  TopName: string;
  TopType: number;
}
