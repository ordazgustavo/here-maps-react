---
id: routeline
title: <RouteLine />
---

`<RouteLine />` is the component used for displaying a `Polyline` representing a
route between two or more points on the map given a `shape` of latitudes and
longitudes.

## Usage

```jsx
import React from 'react':
import { HEREMap, Marker, RouteLine } from 'here-maps-react';

export function Map() {
  const [shape, setShape] = React.useState([]);

  React.useEffect(() => {
    ...
    setShape([...]);
  });

  return (
    <HEREMap
      appId="my_app_id"
      appCode="my_app_code"
      center={{ lat: 10.998666, lng: -63.79841 }}
      zoom={12}
    >
      <Marker lat={10.998666} lng={-63.79841} />
      <Marker lat={10.998666} lng={-63.79841} />
      <RouteLine shape={shape} strokeColor="#48dad0" lineWidth={4} />
     </HEREMap>
  );
}
```

### Props

**Available**

- `strokeColor?: string;`
- `lineWidth?: number;`
- `shape: string[];`

**To be implemented**

- `style?: (H.map.SpatialStyle | H.map.SpatialStyle.Options);`
- `arrows?: (H.map.ArrowStyle | H.map.ArrowStyle.Options);`
- `visibility?: boolean;`
- `zIndex?: number;`
- `min?: number;`
- `max?: number;`
- `provider?: H.map.provider.Provider;`
- `data?: any;`

### Reference

You can find more info about this types
[here](https://developer.here.com/documentation/maps/topics_api/h-intro.html).
