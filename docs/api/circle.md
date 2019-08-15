---
id: circle
title: <Circle />
---

`<Circle />` is the component used for displaying circle shapes on the map.

## Usage

```jsx
import React from 'react':
import { HEREMap, Marker, Circle } from 'here-maps-react';

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
      <Circle radius={20} lat={10.998666} lng={-63.79841} />
     </HEREMap>
  );
}
```

### Props

**Available**

- `lat: H.geo.Latitude;`
- `lng: H.geo.Longitude;`
- `radius: number;`
- `strokeColor?: string;`
- `lineWidth?: number;`
- `fillColor?: string;`

**To be implemented**

- `style?: H.map.SpatialStyle | H.map.SpatialStyle.Options;`
- `visibility?: boolean;`
- `precision?: number;`
- `zIndex?: number;`
- `min?: number;`
- `max?: number;`
- `provider?: H.map.provider.Provider;`
- `data?: any;`

### Reference

You can find more info about this types
[here](https://developer.here.com/documentation/maps/topics_api/h-intro.html).
