import React from 'react'

import MapContext, { HEREMapContext } from './utils/map-context'

export interface CircleProps extends H.map.Circle.Options, H.geo.IPoint {
  strokeColor?: string
  lineWidth?: number
  fillColor?: string
  radius: number
}

export class Circle extends React.Component<CircleProps> {
  public static contextType = MapContext
  public static defaultProps = {
    fillColor: 'rgba(255, 255, 255, 0.5)',
    lineWidth: 1,
    radius: 1000,
    strokeColor: 'black',
  }
  public context!: HEREMapContext

  private circle?: H.map.Circle

  public componentDidUpdate(prevProps: CircleProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      this.setCenter({
        lat: prevProps.lat,
        lng: prevProps.lng,
      })
    }

    if (prevProps.radius && prevProps.radius !== this.props.radius) {
      this.setRadius(prevProps.radius)
    }
  }

  public componentWillUnmount() {
    const { map } = this.context

    if (map && this.circle) {
      map.removeObject(this.circle)
    }
  }

  private addCircleToMap() {
    const { map } = this.context

    const { lat, lng, strokeColor, lineWidth, fillColor, radius } = this.props

    const circle = new H.map.Circle(
      {
        lat,
        lng,
      },
      radius,
      {
        style: {
          fillColor,
          lineWidth,
          strokeColor,
        },
      },
    )
    if (map) {
      map.addObject(circle)

      this.circle = circle
    }
  }

  private setCenter(point: H.geo.IPoint) {
    if (this.circle) {
      this.circle.setCenter(point)
    }
  }

  private setRadius(radius: number) {
    if (this.circle) {
      this.circle.setRadius(radius)
    }
  }

  public render() {
    const { map } = this.context

    if (map && !this.circle) {
      this.addCircleToMap()
    }

    return null
  }
}

export default Circle
