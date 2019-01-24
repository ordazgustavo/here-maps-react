# here-maps-react

> React components library for HERE Maps

[![NPM](https://img.shields.io/npm/v/here-maps-react.svg)](https://www.npmjs.com/package/here-maps-react)
![](https://img.shields.io/github/license/ordazgustavo/here-maps-react.svg)

## Install

```bash
npm install --save here-maps-react
```

## Usage

### Map

```jsx
import React from 'react'
import HEREMap from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{ lat: -12.0464, lng: -77.0428 }}
        zoom={12}
      />
    )
  }
}
```

#### Props

| Property      | Type    | Optional | Description                                                                                                                                                                           |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId         | string  | false    | The App Id you got after registering to HERE                                                                                                                                          |
| appCode       | string  | false    | The App Code you got after registering to HERE                                                                                                                                        |
| center        | object  | true     | Initial map coordinates { lat, lng }                                                                                                                                                  |
| zoom          | number  | true     | Initial zoom level                                                                                                                                                                    |
| animateCenter | boolean | true     | Animate center prop change                                                                                                                                                            |
| animateZoom   | boolean | true     | Animate zoom level change                                                                                                                                                             |
| hidpi         | boolean | true     | Whether to use high quality map tiles or not                                                                                                                                          |
| interactive   | boolean | true     | Whether to use static or interactive maps                                                                                                                                             |
| secure        | boolean | true     | If true, here-maps-react will load the HTTPS HERE api                                                                                                                                 |
| setLayer      | object  | true     | An object that can be used to set the map style { layer, mapType }. You can find available configurations [HERE](https://developer.here.com/documentation/maps/topics/map-types.html) |

### Marker

```jsx
import React from 'react'
import HEREMap, { Marker } from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{ lat: -12.0464, lng: -77.0428 }}
        zoom={12}
      >
        <Marker lat={-12.1199408} lng={-77.037241} />
      </HEREMap>
    )
  }
}
```

### Props

| Property | Type        | Optional | Description                                   |
| -------- | ----------- | -------- | --------------------------------------------- |
| bitmap   | string      | true     | An image to be used as a marker               |
| lat      | number      | false    | The latitude to place the marker              |
| lng      | number      | false    | The longitude to place the marker             |
| children | JSX.Element | true     | You can use markup to put elements on the map |

### RouteLine

```jsx
import React from 'react'
import HEREMap, { Marker, RouteLine } from 'here-maps-react'

class Map extends React.Component {
  render() {
    return (
      <HEREMap
        appId="my_app_id"
        appCode="my_app_code"
        center={{ lat: -12.0464, lng: -77.0428 }}
        zoom={12}
      >
        <Marker lat={-12.1199408} lng={-77.037241} />
        <Marker lat={-12.1261171} lng={-77.02060549999999} />
        <RouteLine
          shape={this.state.shape}
          strokeColor="#48dad0"
          lineWidth={4}
        />
      </HEREMap>
    )
  }
}
```

#### Props

| Property    | Type     | Optional | Description                                                                                                                                   |
| ----------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| shape       | string[] | false    | An array of latitudes and longitudes obtained using the [HERE Routing API](https://developer.here.com/documentation/maps/topics/routing.html) |
| strokeColor | number   | true     | An optional (HEX, RGB, HSL...) color                                                                                                          |
| lineWidth   | number   | true     | A number representing the width of the route line                                                                                             |

This library is based on the original
[react-here-maps](https://github.com/Josh-ES/react-here-maps), updated to
conform to React StrictMode, as well as, adding new components.

## License

MIT © [ordazgustavo](https://github.com/ordazgustavo)
