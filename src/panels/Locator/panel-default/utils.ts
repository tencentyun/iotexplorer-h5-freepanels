import gcoord from 'gcoord';
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
export function WGS84ToGCJ02(coord: LngLat): LngLat {
  return gcoord.transform(coord, gcoord.WGS84, gcoord.GCJ02);
}

export function GCJ02ToWGS84(coord: LngLat): LngLat {
  return gcoord.transform(coord, gcoord.GCJ02, gcoord.WGS84);
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
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
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

export const padNumber = num => (num < 10 ? `0${num}` : `${num}`);
