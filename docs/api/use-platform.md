---
id: use-platform
title: usePlatform()
---

`usePlatform()` is a hook that you can use to initialize the HERE Maps service
Platform by yourselve.

## Usage

```jsx
import React from 'react':
import { usePlatform } from 'here-maps-react';

export function Map() {
  const platform = usePlatform({
    app_code: appCode,
    app_id: appId,
    useHTTPS: true,
  });

  ...
}
```

It receives all of the options that you can pass to the `H.service.Platform`
constructor as a first argument and an optional `scriptsLoaded?: boolean`
(defaults to `true`) which is mostly for internal use, and returns a
`H.service.Platform`.

### Reference

You can find more info about this types
[here](https://developer.here.com/documentation/maps/topics_api/h-intro.html).
