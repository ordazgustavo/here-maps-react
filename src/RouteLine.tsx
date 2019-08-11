import React from 'react';

import MapContext from './utils/map-context';

type Shape = string[];

export interface RouteLineProps extends H.map.Polyline.Options {
  strokeColor?: string;
  lineWidth?: number;
  shape: Shape;
}

export const RouteLine: React.FC<RouteLineProps> = ({
  shape,
  strokeColor,
  lineWidth,
}) => {
  const mapContext = React.useContext(MapContext);
  const [routeLine, setRouteLine] = React.useState<H.map.Polyline>();

  React.useEffect(() => {
    const { map } = mapContext;
    if (map) {
      const linestring = new H.geo.LineString();
      shape.forEach(point => {
        const [lat, lng] = point.split(',');
        linestring.pushLatLngAlt(Number(lat), Number(lng), 1);
      });

      const newRouteLine = new H.map.Polyline(linestring, {
        style: { strokeColor, lineWidth },
      });

      if (routeLine) {
        map.removeObject(routeLine);
      }
      map.addObject(newRouteLine);

      setRouteLine(routeLine);
    }
    return () => {
      if (map && routeLine) {
        map.removeObject(routeLine);
      }
    };
  }, [lineWidth, mapContext, routeLine, shape, strokeColor]);

  return null;
};

export default RouteLine;
