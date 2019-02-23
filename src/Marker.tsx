import React from 'react'
import ReactDOMServer from 'react-dom/server'

import getDomMarkerIcon from './utils/get-dom-marker-icon'
import getMarkerIcon from './utils/get-marker-icon'
import MapContext, { HEREMapContext } from './utils/map-context'
import { setMarkerDragEvent } from './utils/set-drag-event'

const markerEvents = {
  onDragStart: 'dragstart',
  onDrag: 'drag',
  onDragEnd: 'dragend',
}

export interface MarkerProps extends H.map.Marker.Options, H.geo.IPoint {
  bitmap?: string
  draggable?: boolean
  onDragStart?: (e: H.util.Event) => void
  onDrag?: (e: H.util.Event) => void
  onDragEnd?: (e: H.util.Event) => void
}

export class Marker extends React.Component<MarkerProps> {
  public static contextType = MapContext
  public context!: HEREMapContext
  private marker?: H.map.DomMarker | H.map.Marker

  public componentDidMount() {
    const { map } = this.context
    if (map && !this.marker) {
      this.addMarkerToMap()
    }

    if (this.marker) {
      Object.entries(markerEvents).forEach(([event, hereEvent]) => {
        if (typeof this.props[event] === 'function') {
          this.marker!.addEventListener(hereEvent, this.props[event])
        }
      })
    }
  }

  public componentDidUpdate(prevProps: MarkerProps) {
    if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
      this.setPosition({
        lat: this.props.lat,
        lng: this.props.lng,
      })
    }
  }

  public componentWillUnmount() {
    const { map } = this.context

    if (this.marker) {
      Object.entries(markerEvents).forEach(([event, hereEvent]) => {
        if (typeof this.props[event] === 'function') {
          this.marker!.removeEventListener(hereEvent, this.props[event])
        }
      })
    }

    if (map && this.marker) {
      map.removeObject(this.marker)
    }
  }

  private addMarkerToMap() {
    const { map, behavior } = this.context
    const { children, bitmap, lat, lng, draggable } = this.props

    let marker: H.map.DomMarker | H.map.Marker
    if (map) {
      if (React.Children.count(children) > 0) {
        const html = ReactDOMServer.renderToStaticMarkup(
          <div className="dom-marker">{children}</div>,
        )
        const icon = getDomMarkerIcon(html)
        marker = new H.map.DomMarker({ lat, lng }, { icon })
      } else if (bitmap) {
        const icon = getMarkerIcon(bitmap)

        marker = new H.map.Marker({ lat, lng }, { icon })
      } else {
        marker = new H.map.Marker({ lat, lng })
      }

      if (draggable && behavior) {
        marker.draggable = draggable
        setMarkerDragEvent(map, behavior)
      }

      map.addObject(marker)
      this.marker = marker
    }
    return null
  }

  private setPosition(point: H.geo.IPoint): void {
    if (this.marker) {
      this.marker.setPosition(point)
    }
  }

  public render() {
    return null
  }
}

export default Marker
