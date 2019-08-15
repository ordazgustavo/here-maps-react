---
id: installation
title: Installation
sidebar_label: Installation
---

[here-maps-react](https://github.com/ordazgustavo/here-maps-react) is an
"unnoficial" library for adding HERE Maps to a React application in a composable
fashion.

The **1.0.0** version of this library requires React 16.8.0 or later.

```bash
npm install react-here-maps
```

or

```bash
yarn add react-here-maps
```

There's no need to add the required
[script tags](https://developer.here.com/documentation/maps/topics/quick-start.html)
because it is all managed by `here-maps-react`.

The only required step is to
[generate](https://developer.here.com/documentation/maps/common/get-credentials-api-key.html)
an `api_code` and `api_id`.

Currently this library uses the 3.0 version of the map api until the types are
updated for the 3.1 version.
