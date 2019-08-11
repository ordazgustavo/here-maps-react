/* eslint @typescript-eslint/camelcase: 0 */
import React from 'react';
import debounce from 'lodash.debounce';

import MapContext from './utils/map-context';
import { HEvents, events, Events } from './utils/map-events';
import { usePlatform } from './hooks/use-platform';
import { useScript } from 'hooks/use-script';
import { useLink } from 'hooks/use-link';

export interface HEREMapProps extends H.Map.Options, HEvents {
  appId: string;
  appCode: string;
  animateCenter?: boolean;
  animateZoom?: boolean;
  hidpi?: boolean;
  interactive?: boolean;
  secure?: boolean;
  setLayer?: {
    layer: keyof H.service.MapType;
    mapType: keyof H.service.DefaultLayers;
  };
}

export const HEREMap: React.FC<HEREMapProps> = ({
  animateCenter,
  animateZoom,
  appId,
  appCode,
  center,
  hidpi,
  interactive,
  secure,
  zoom,
  setLayer,
  children,
  ...rest
}) => {
  const [map, setMap] = React.useState<H.Map>();
  const [behavior, setBehavior] = React.useState<H.mapevents.Behavior>();
  const [ui, setUi] = React.useState<H.ui.UI>();
  const debouncedResizeMap = debounce(resizeMap, 200);
  const [,] = useLink(
    'https://js.api.here.com/v3/3.0/mapsjs-ui.css?dp-version=1526040296',
    'map-styles',
  );
  const [coreLoaded] = useScript(
    'https://js.api.here.com/v3/3.0/mapsjs-core.js',
    'core',
  );
  const [serviceLoaded] = useScript(
    'https://js.api.here.com/v3/3.0/mapsjs-service.js',
    'service',
  );
  const [uiLoaded] = useScript(
    'https://js.api.here.com/v3/3.0/mapsjs-ui.js',
    'ui',
  );
  const [mapeventsLoaded] = useScript(
    'https://js.api.here.com/v3/3.0/mapsjs-mapevents.js',
    'mapevents',
  );
  const platform = usePlatform(
    {
      app_code: appCode,
      app_id: appId,
      useHTTPS: secure === true,
    },
    coreLoaded && serviceLoaded && uiLoaded && mapeventsLoaded,
  );

  React.useEffect(() => {
    if (platform) {
      const defaultLayers = platform.createDefaultLayers({
        ppi: hidpi ? 320 : 72,
      });

      const mapElement = document.querySelector('#map-container');

      let customLayer: H.map.layer.Layer | undefined;
      if (setLayer && setLayer.mapType && setLayer.layer) {
        const { mapType, layer } = setLayer;
        if (mapType === 'incidents' || mapType === 'venues') {
          customLayer = defaultLayers[mapType];
        } else {
          customLayer = defaultLayers[mapType][layer];
        }
      }

      if (mapElement && !map) {
        const newMap = new H.Map(
          mapElement,
          customLayer || defaultLayers.normal.map,
          {
            center,
            zoom,
            pixelRatio: hidpi ? 2 : 1,
          },
        );
        setMap(newMap);
        if (interactive) {
          const newBehavior = new H.mapevents.Behavior(
            new H.mapevents.MapEvents(newMap),
          );

          const newUi = H.ui.UI.createDefault(newMap, defaultLayers);
          setBehavior(newBehavior);
          setUi(newUi);
        }
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', debouncedResizeMap);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', debouncedResizeMap);
      }
    };
  }, [
    center,
    debouncedResizeMap,
    hidpi,
    interactive,
    map,
    platform,
    setLayer,
    zoom,
  ]);

  React.useEffect(() => {
    if (map) {
      Object.entries(events).forEach(([event, hereEvent]) => {
        const e = rest[event as keyof Events];
        if (typeof e === 'function') {
          map.addEventListener(hereEvent, e);
        }
      });
    }
    return () => {
      if (map) {
        Object.entries(events).forEach(([event, hereEvent]) => {
          const e = rest[event as keyof Events];
          if (typeof e === 'function') {
            map.removeEventListener(hereEvent, e);
          }
        });
      }
    };
  }, [map, rest]);

  React.useEffect(() => {
    if (map && center) {
      map.setCenter(center, animateCenter === true);
    }
  }, [animateCenter, center, map]);

  React.useEffect(() => {
    if (map && zoom) {
      map.setZoom(zoom, animateZoom === true);
    }
  }, [animateZoom, map, zoom]);

  function resizeMap() {
    if (map) {
      map.getViewPort().resize();
    }
  }

  return (
    <MapContext.Provider value={{ map, behavior, ui }}>
      <div
        id="map-container"
        data-testid="map-container"
        style={{ height: '100%' }}
      >
        {map ? children : null}
      </div>
    </MapContext.Provider>
  );
};

export default HEREMap;
