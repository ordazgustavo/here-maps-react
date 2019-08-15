import React from 'react';

export interface HEREMapContext {
  map?: H.Map;
  behavior?: H.mapevents.Behavior;
  ui?: H.ui.UI;
}

const MapContext = React.createContext({} as HEREMapContext);

export default MapContext;
