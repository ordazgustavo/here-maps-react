import React from 'react'

import MapContext, { HEREMapContext } from './utils/map-context'

type Shape = string[]

export interface RouteLineProps extends H.map.Polyline.Options, H.geo.IPoint {
  strokeColor?: string
  lineWidth?: number
  shape: Shape
}

class RouteLine extends React.Component<RouteLineProps, object> {
  public static contextType = MapContext

  public context: HEREMapContext

  private routeLine?: H.map.Polyline

  public componentDidUpdate(prevProps: RouteLineProps) {
    const { shape } = this.props
    if (this.didShapeChange(prevProps.shape, shape)) {
      this.addRouteLineToMap()
    }
  }

  public componentWillUnmount() {
    const { map } = this.context

    if (map && this.routeLine) {
      map.removeObject(this.routeLine)
    }
  }

  private didShapeChange = (prevShape: Shape, nextShape: Shape) => {
    const diff = nextShape.filter((coord, i) => {
      if (coord && prevShape && prevShape[i]) {
        return coord !== prevShape[i]
      }
      return true
    })
    return Boolean(diff.length)
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
      if (this.routeLine) {
        map.removeObject(this.routeLine)
      }
      map.addObject(routeLine)

      this.routeLine = routeLine
    }
  }

  public render() {
    const { map } = this.context

    if (map && !this.routeLine) {
      this.addRouteLineToMap()
    }

    return null
  }
}

export default RouteLine
