import React from 'react';

import MapContext from './utils/map-context';

export interface CircleProps extends H.map.Circle.Options, H.geo.IPoint {
  strokeColor?: string;
  lineWidth?: number;
  fillColor?: string;
  radius: number;
}

export const Circle: React.FC<CircleProps> = ({
  lat,
  lng,
  strokeColor,
  lineWidth,
  fillColor,
  radius,
}) => {
  const mapContext = React.useContext(MapContext);
  const [circle, setCircle] = React.useState<H.map.Circle>();

  React.useEffect(() => {
    const { map } = mapContext;

    if (map && !circle) {
      const newCircle = new H.map.Circle(
        {
          lat,
          lng,
        },
        radius,
        {
          style: {
            fillColor,
            lineWidth,
            strokeColor,
          },
        },
      );
      map.addObject(newCircle);

      setCircle(newCircle);
    }
    return () => {
      if (map && circle) {
        map.removeObject(circle);
      }
    };
  }, [circle, fillColor, lat, lineWidth, lng, mapContext, radius, strokeColor]);

  React.useEffect(() => {
    if (circle && lat && lng) {
      circle.setCenter({
        lat,
        lng,
      });
    }
  }, [circle, lat, lng]);

  React.useEffect(() => {
    if (circle && radius) {
      circle.setRadius(radius);
    }
  }, [circle, radius]);

  return null;
};

export default Circle;
