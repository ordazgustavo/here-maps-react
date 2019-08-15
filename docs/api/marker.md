---
id: marker
title: <Marker />
---

`<Marker />` is the component used for displaying a marker on the map, the only
required props are `lat` and `lng` to set its position.

## Usage

```jsx
import { HEREMap, Marker } from 'here-maps-react';

export function Map() {
  return (
    <HEREMap
      appId="my_app_id"
      appCode="my_app_code"
      center={{ lat: 10.998666, lng: -63.79841 }}
      zoom={12}
    >
      <Marker
        lat={10.998666}
        lng={-63.79841}
        draggable
        onDragEnd={e => {...}}
      />
     </HEREMap>
  );
}
```

### Props

**Available**

- `lat: H.geo.Latitude;`
- `lng: H.geo.Longitude;`
- `bitmap?: string;`
- `children: React.ReactNode`
- `draggable?: boolean;`
- `onPointerDown?: (e: H.util.Event) => void;`
- `onPointerUp?: (e: H.util.Event) => void;`
- `onPointerMove?: (e: H.util.Event) => void;`
- `onPointerEnter?: (e: H.util.Event) => void;`
- `onPointerLeave?: (e: H.util.Event) => void;`
- `onPointerCancel?: (e: H.util.Event) => void;`
- `onDragStart?: (e: H.util.Event) => void;`
- `onDrag?: (e: H.util.Event) => void;`
- `onDragEnd?: (e: H.util.Event) => void;`
- `onTap?: (e: H.util.Event) => void;`
- `onDoubleTap?: (e: H.util.Event) => void;`
- `onLongPress?: (e: H.util.Event) => void;`

**To be implemented**

- `alt?: H.geo.Altitude;`
- `ctx?: H.geo.AltitudeContext;`
- `min?: number;`
- `max?: number;`
- `visibility?: boolean;`
- `zIndex?: number;`
- `provider?: H.map.provider.Provider;`
- `icon?: H.map.Icon;`
- `data?: any;`

### Reference

You can find more info about this types
[here](https://developer.here.com/documentation/maps/topics_api/h-intro.html).
