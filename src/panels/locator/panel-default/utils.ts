import {
  LatLng,
  GeoJSONGeometry,
  GeoJSONFeature,
  GeoJSON, 
  GeoJSONGeometryType,
  GeoJSONGeometrySubType,
} from './types';

export const approximately = (a: number, b: number) => Math.abs(a - b) < 1e-6;

// 坐标系转换
const {
  sin, cos, sqrt, abs, PI,
} = Math;

const a = 6378245;
const ee = 0.006693421622965823;

type LngLat = [number, number];

function isInGCJ02BoundingBox(lng: number, lat: number): boolean {
  return lng >= 72.004 && lng <= 137.8347 && lat >= 0.8293 && lat <= 55.8271;
}

function transformLat(x: number, y: number): number {
  let ret = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
  ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
  ret += (20 * sin(y * PI) + 40 * sin(y / 3 * PI)) * 2 / 3;
  ret += (160 * sin(y / 12 * PI) + 320 * sin(y * PI / 30)) * 2 / 3;
  return ret;
}

function transformLng(x: number, y: number): number {
  let ret = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
  ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
  ret += (20 * sin(x * PI) + 40 * sin(x / 3 * PI)) * 2 / 3;
  ret += (150 * sin(x / 12 * PI) + 300 * sin(x / 30 * PI)) * 2 / 3;
  return ret;
}

function delta(lng: number, lat: number): number[] {
  let dLng = transformLng(lng - 105, lat - 35);
  let dLat = transformLat(lng - 105, lat - 35);

  const radLat = lat / 180 * PI;
  let magic = sin(radLat);

  magic = 1 - ee * magic * magic;

  const sqrtMagic = sqrt(magic);
  dLng = (dLng * 180) / (a / sqrtMagic * cos(radLat) * PI);
  dLat = (dLat * 180) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);

  return [dLng, dLat];
}

export function WGS84ToGCJ02(coord: LngLat): LngLat {
  const [lng, lat] = coord;

  if (!isInGCJ02BoundingBox(lng, lat)) return [lng, lat];

  const d = delta(lng, lat);

  return [lng + d[0], lat + d[1]];
}

export function GCJ02ToWGS84(coord: LngLat): LngLat {
  const [lng, lat] = coord;

  if (!isInGCJ02BoundingBox(lng, lat)) return [lng, lat];

  let [wgsLng, wgsLat] = [lng, lat];

  let tempPoint = WGS84ToGCJ02([wgsLng, wgsLat]);

  let dx = tempPoint[0] - lng;
  let dy = tempPoint[1] - lat;

  while (abs(dx) > 1e-6 || abs(dy) > 1e-6) {
    wgsLng -= dx;
    wgsLat -= dy;

    tempPoint = WGS84ToGCJ02([wgsLng, wgsLat]);
    dx = tempPoint[0] - lng;
    dy = tempPoint[1] - lat;
  }

  return [wgsLng, wgsLat];
}

export const generateCircleFenceArea = (centerLatLng: LatLng, radius: number): GeoJSON => {
  const center = [centerLatLng.lng, centerLatLng.lat];

  const fenceGeometry: GeoJSONGeometry = {
    type: GeoJSONGeometryType.Point,
    coordinates: center,
  };
  
  const fenceFeature: GeoJSONFeature = {
    type: 'Feature',
    geometry: fenceGeometry,
    properties: {
      subType: GeoJSONGeometrySubType.Circle,
      radius,
    },
  };
  
  const geoJson: GeoJSON = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
    },
    features: [fenceFeature],
  };

  return geoJson;
};

export const rgba = (red: number, green: number, blue: number, alpha: number) => ({
  red,
  green,
  blue,
  alpha,
});
