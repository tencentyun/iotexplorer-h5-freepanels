export enum LocatorPanelTab {
  Map = 'map',
  Fence = 'fence',
  Detail = 'detail',
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface GeoJSONGeometry {
  type: GeoJSONGeometryType;
  coordinates: any[];
}

export interface GeoJSONFeature {
  type: string;
  properties?: {
    subType?: GeoJSONGeometrySubType;
    radius?: number;
    code?: string;
  } | null;
  geometry: GeoJSONGeometry;
}

export interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
  crs?: object;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface LatLngWithTime extends LatLng {
  time: number;
}

export enum GeoJSONGeometryType {
  Point = 'Point',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
}

export enum GeoJSONGeometrySubType {
  Polygon = 0,
  Circle = 1,
  AdCode = 2,
}

export enum AlertConditionType {
  In = 'In',
  Out = 'Out',
InOrOut = 'InOrOut',
}

export const AlertConditionTypeStr = {
  [AlertConditionType.In]: '进入',
  [AlertConditionType.Out]: '超出',
  [AlertConditionType.InOrOut]: '进出',
};

export enum AlertMethodType {
  Push = 'push',
}

export const AlertMethodTypeStr = {
  [AlertMethodType.Push]: '消息中心',
};

export interface DeviceFenceInfo {
  FenceId: number;
	FenceName: string;
	FenceDesc: string;
	FenceArea: GeoJSON | null;
	AlertCondition: AlertConditionType;
	FenceEnable: boolean;
	Method: AlertMethodType;
	CreateTime: number;
	UpdateTime: number;
}

export enum CoordinateType {
  BD09 = 1,
  GCJ02 = 2,
  WGS84 = 3,
}

export interface DevicePosition {
  Location: { Longitude: number; Latitude: number; }
  CreateTime: number;
}

export interface DeviceFenceEvent {
	EventType: AlertConditionType;
	CreateTime: number;
}

export enum DetailPage {
  HistoryList = 'history-list',
  EventList = 'event-list',
  PositioningMode = 'positioning-mode',
}

export enum MapViewType {
  DeviceCurrent = 'current',
  DeviceHistory = 'history',
  Fence = 'fence',
}
