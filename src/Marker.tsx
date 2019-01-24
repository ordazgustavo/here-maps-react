import React from 'react'
import ReactDOMServer from 'react-dom/server'

import getDomMarkerIcon from './utils/get-dom-marker-icon'
import getMarkerIcon from './utils/get-marker-icon'
import MapContext, { HEREMapContext } from './utils/map-context'

export interface MarkerProps extends H.map.Marker.Options, H.geo.IPoint {
  bitmap?: string
}

export class Marker extends React.Component<MarkerProps> {
  public static contextType = MapContext
  public context: HEREMapContext
  private marker: H.map.DomMarker | H.map.Marker | null = null

  public componentDidUpdate(prevProps: MarkerProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      this.setPosition({
        lat: prevProps.lat,
        lng: prevProps.lng,
      })
    }
  }

  public componentWillUnmount() {
    const { map } = this.context

    if (map && this.marker) {
      map.removeObject(this.marker)
    }
  }

  private addMarkerToMap() {
    const { map } = this.context

    const { children, bitmap, lat, lng } = this.props

    let marker: H.map.DomMarker | H.map.Marker
    if (map) {
      if (React.Children.count(children) > 0) {
        const html = ReactDOMServer.renderToStaticMarkup(
          <div className="dom-marker">{children}</div>,
        )

        const icon = getDomMarkerIcon(html)

        marker = new H.map.DomMarker({ lat, lng }, { icon })
        map.addObject(marker)
      } else if (bitmap) {
        const icon = getMarkerIcon(bitmap)

        marker = new H.map.Marker({ lat, lng }, { icon })
        map.addObject(marker)
      } else {
        marker = new H.map.Marker({ lat, lng })
        map.addObject(marker)
      }

      this.marker = marker
    }
    return <div />
  }

  private setPosition(point: H.geo.IPoint): void {
    if (this.marker) {
      this.marker.setPosition(point)
    }
  }

  public render() {
    const { map } = this.context

    if (map && !this.marker) {
      this.addMarkerToMap()
    }

    return null
  }
}

export default Marker
