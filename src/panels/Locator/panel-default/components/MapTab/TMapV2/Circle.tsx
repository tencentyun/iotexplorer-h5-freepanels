import { useEffect, useRef } from 'react';
import { Color } from './types';
import { LatLng } from '../../../types';

interface CircleProps {
  map,
  qqMaps,
  center: LatLng;
  radius: number;
  strokeColor?: Color | string;
  strokeWeight?: number;
  fillColor?: Color | string;
  onBoundsChange?: (bounds: any) => void;
}

export function Circle({
  map,
  qqMaps,
  center,
  radius,
  strokeColor,
  strokeWeight,
  fillColor,
  onBoundsChange,
}: CircleProps) {
  const circleRef = useRef(null);

  useEffect(() => {
    circleRef.current = new qqMaps.Circle({
      map,
      center: new qqMaps.LatLng(center.lat, center.lng),
      radius,
    });

    return () => {
      if (circleRef.current !== null) {
        const circle: any = circleRef.current;
        circle.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (circleRef.current !== null) {
      const circle: any = circleRef.current;
      circle.setRadius(radius);
      if (onBoundsChange) {
        onBoundsChange(circle.getBounds());
      }
    }
  }, [radius]);

  useEffect(() => {
    if (circleRef.current !== null) {
      const circle: any = circleRef.current;
      circle.setCenter(new qqMaps.LatLng(center.lat, center.lng));
      if (onBoundsChange) {
        onBoundsChange(circle.getBounds());
      }
    }
  }, [center]);

  useEffect(() => {
    if (circleRef.current !== null && strokeColor !== undefined) {
      const circle: any = circleRef.current;
      if (typeof strokeColor === 'object') {
        circle.setStrokeColor(new qqMaps.Color(
          strokeColor.red,
          strokeColor.green,
          strokeColor.blue,
          strokeColor.alpha === undefined ? 1 : strokeColor.alpha,
        ));
      } else {
        circle.setStrokeColor(strokeColor);
      }
    }
  }, [strokeColor]);

  useEffect(() => {
    if (circleRef.current !== null && strokeWeight !== undefined) {
      const circle: any = circleRef.current;
      circle.setStrokeWeight(strokeWeight);
    }
  }, [strokeWeight]);

  useEffect(() => {
    if (circleRef.current !== null && fillColor !== undefined) {
      const circle: any = circleRef.current;
      if (typeof fillColor === 'object') {
        circle.setFillColor(new qqMaps.Color(
          fillColor.red,
          fillColor.green,
          fillColor.blue,
          fillColor.alpha === undefined ? 1 : fillColor.alpha,
        ));
      } else {
        circle.setFillColor(fillColor);
      }
    }
  }, [fillColor]);

  return null;
}
