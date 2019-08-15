---
id: here-map
title: <HEREMap />
---

`<HEREMap />` is the main component included. It is the one that encapsulates
the logic.

It can be imported as a default import:

```jsx
import HEREMap from 'here-maps-react';
```

or as a named import

```jsx
import { HEREMap } from 'here-maps-react';
```

## Usage

```jsx
export function Map() {
  return (
    <HEREMap
      appId="my_app_id"
      appCode="my_app_code"
      center={{ lat: 10.998666, lng: -63.79841 }}
      zoom={12}
    />
  );
}
```

### Props

**Available**

- `appId: string;`
- `appCode: string;`
- `animateCenter?: boolean;`
- `animateZoom?: boolean;`
- `center?: H.geo.IPoint;`
- `children: React.ReactNode`
- `hidpi?: boolean;`
- `interactive?: boolean;`
- `secure?: boolean;`
- `setLayer?: { layer: keyof H.service.MapType; mapType: keyof H.service.DefaultLayers; };`
- `zoom?: number;`
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

- `bounds?: H.geo.Rect;`
- `layers?: H.map.layer.Layer[];`
- `engineType?: EngineType;`
- `pixelRatio?: number;`
- `imprint?: H.map.Imprint.Options;`
- `renderBaseBackground?: BackgroundRange;`
- `autoColor?: boolean;`
- `margin?: number;`
- `padding?: H.map.ViewPort.Padding;`
- `fixedCenter?: boolean;`
- `noWrap?: boolean;`

### Reference

You can find more info about this types
[here](https://developer.here.com/documentation/maps/topics_api/h-intro.html).
