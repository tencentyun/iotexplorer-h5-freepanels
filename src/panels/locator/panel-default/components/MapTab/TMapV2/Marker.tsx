import { useEffect, useRef } from 'react';
import { LatLng } from '../../../types';

interface MarkerImage {
  url: string;
  size?: { width: number; height: number; };
  origin?: { x: number; y: number; };
  anchor?: { x: number; y: number; };
  scaleSize?: { width: number; height: number; };
  shadowAngle?: number;
}

interface MarkerProps {
  map,
  qqMaps,
  position: LatLng;
  icon?: MarkerImage;
  onClick?: () => void;
}

export function Marker({
  map,
  qqMaps,
  position,
  icon,
  onClick,
}: MarkerProps) {
  const markerRef = useRef(null);

  useEffect(() => {
    markerRef.current = new qqMaps.Marker({
      map,
    });

    return () => {
      if (markerRef.current !== null) {
        const marker: any = markerRef.current;
        marker.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (markerRef.current !== null) {
      const marker: any = markerRef.current;
      marker.setIcon(icon ? new qqMaps.MarkerImage(
        icon.url,
        icon.size && new qqMaps.Size(icon.size.width, icon.size.height),
        icon.origin && new qqMaps.Point(icon.origin.x, icon.origin.y),
        icon.anchor && new qqMaps.Point(icon.anchor.x, icon.anchor.y),
        icon.scaleSize && new qqMaps.Size(icon.scaleSize.width, icon.scaleSize.height),
        icon.shadowAngle
      ) : null);
    }
  }, [icon]);

  useEffect(() => {
    if (markerRef.current !== null) {
      const marker: any = markerRef.current;
      marker.setPosition(new qqMaps.LatLng(position.lat, position.lng));
    }
  }, [position]);

  useEffect(() => {
    if (onClick && markerRef.current !== null) {
      const marker: any = markerRef.current;
      const listener = qqMaps.event.addListener(marker, 'click', onClick);
      return () => {
        qqMaps.event.removeListener(listener);
      };
    }
  }, [onClick]);

  return null;
}
