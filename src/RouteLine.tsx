import React from 'react'

import MapContext, { HEREMapContext } from './utils/map-context'

export interface RouteLineProps extends H.map.Polyline.Options, H.geo.IPoint {
  strokeColor?: string
  lineWidth?: number
  shape: string[]
}

class RouteLine extends React.Component<RouteLineProps, object> {
  public static contextType = MapContext

  public context: HEREMapContext

  private routeLine: H.map.Polyline

  public componentWillUnmount() {
    const { map } = this.context

    if (map && this.routeLine) {
      map.removeObject(this.routeLine)
    }
  }

  public render() {
    const { map } = this.context

    if (map && !this.routeLine) {
      this.addRouteLineToMap()
    }

    return null
  }

  private addRouteLineToMap() {
    const { map } = this.context

    const { shape, strokeColor, lineWidth } = this.props

    const linestring = new H.geo.LineString()
    shape.forEach(point => {
      const [lat, lng] = point.split(',')
      linestring.pushLatLngAlt(Number(lat), Number(lng), 1)
    })

    const routeLine = new H.map.Polyline(linestring, {
      style: { strokeColor, lineWidth },
    })

    if (map) {
      map.addObject(routeLine)

      this.routeLine = routeLine
    }
  }
}

export default RouteLine
