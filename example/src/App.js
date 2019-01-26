import React, { Component } from 'react'

import {HEREMap, Marker, RouteLine} from 'here-maps-react'

const APP_ID = process.env.REACT_APP_HERE_APP_ID
const APP_CODE = process.env.REACT_APP_HERE_APP_CODE

const markers = [
  {
    lat: -12.1199408,
    lng: -77.037241
  },
  {
    lat: -12.1261171,
    lng: -77.02060549999999
  },
  {
    lat: -12.0848237,
    lng: -77.09810249999998
  }
]


export default class App extends Component {

  state = { shape: [
    "-12.1199494,-77.0370773",
    "-12.1210957,-77.0371306",
    "-12.1212351,-77.0370233",
    "-12.1212673,-77.0348346",
    "-12.1212566,-77.0338583",
    "-12.1212673,-77.0337617",
    "-12.1212995,-77.0336866",
    "-12.122705,-77.0320773",
    "-12.122941,-77.0317662",
    "-12.1231556,-77.0319593",
    "-12.1233594,-77.0321095",
    "-12.1238422,-77.0324099",
    "-12.1241426,-77.0316589",
    "-12.124325,-77.030822",
    "-12.1244001,-77.030189",
    "-12.1245182,-77.0293951",
    "-12.1250975,-77.0259619",
    "-12.1253443,-77.0242989",
    "-12.1253765,-77.023977",
    "-12.1254086,-77.023859",
    "-12.125473,-77.023741",
    "-12.1259776,-77.0205808"
  ] }

  componentDidMount() {
    const platform = new window.H.service.Platform({
      app_id: APP_ID,
      app_code: APP_CODE
    });

    const routingParameters = {
      mode: 'fastest;car',
      representation: 'display',
      routeAttributes: ['waypoints', 'summary', 'shape'],
      waypoint0: '-12.1199408,-77.037241',
      waypoint1: '-12.1261171,-77.02060549999999',
      waypoint2: '-12.0848237,-77.09810249999998',
    };

    const router = platform.getRoutingService();

    // if (!this.state.shape) {
    //   router.calculateRoute(routingParameters, this.onResult, console.log);
    // }
  }

  onResult = (result) => {
    if(result.response.route) {
      const route = result.response.route[0];
      const {shape} = route;
  
      this.setState({shape})
    }
  };
  
  render () {
    const {shape} = this.state
    return (
      <div style={{height: 500, width: 300}}>
      <HEREMap 
        appId={APP_ID}
        appCode={APP_CODE}
        center={{ lat: -12.0464, lng: -77.0428 }}
        zoom={12}
        interactive
        setLayer={{layer: 'map', mapType: 'terrain'}}
      >
        {markers.map(marker => (
          <Marker key={marker.lat} {...marker} />
        ))}
        {shape && <RouteLine shape={shape} strokeColor="#48dad0" lineWidth={4} />}
      </HEREMap>
      </div>
    )
  }
}
