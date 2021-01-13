import { useEffect, useRef } from 'react';
import { Color } from './types';
import { LatLng } from '../../../types';

interface PolylineProps {
  map,
  qqMaps,
  path: LatLng[];
  strokeColor?: string | Color;
  strokeWeight?: number;
}

export function Polyline({
  map,
  qqMaps,
  path,
  strokeColor,
  strokeWeight,
}: PolylineProps) {
  const polylineRef = useRef(null);

  useEffect(() => {
    polylineRef.current = new qqMaps.Polyline({
      map,
    });

    return () => {
      if (polylineRef.current !== null) {
        const polyline: any = polylineRef.current;
        polyline.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (polylineRef.current !== null && strokeColor !== undefined) {
      const polyline: any = polylineRef.current;
      if (typeof strokeColor === 'object') {
        polyline.setStrokeColor(new qqMaps.Color(
          strokeColor.red,
          strokeColor.green,
          strokeColor.blue,
          strokeColor.alpha === undefined ? 1 : strokeColor.alpha,
        ));
      } else {
        polyline.setStrokeColor(strokeColor);
      }
    }
  }, [strokeColor]);

  useEffect(() => {
    if (polylineRef.current !== null && strokeWeight !== undefined) {
      const polyline: any = polylineRef.current;
      polyline.setStrokeWeight(strokeWeight);
    }
  }, [strokeWeight]);

  useEffect(() => {
    if (polylineRef.current !== null) {
      const polyline: any = polylineRef.current;
      polyline.setPath(path.map(position => new qqMaps.LatLng(position.lat, position.lng)));
    }
  }, [path]);

  return null;
}
