import React from 'react'
import ReactDOM from 'react-dom'

import cache, { onAllLoad } from './utils/cache'
import debounce from './utils/debounce'
import getLink from './utils/get-link'
import getScriptMap from './utils/get-script-map'
import MapContext, { HEREMapContext } from './utils/map-context'
import getPlatform from './utils/get-platform'

const mapEvents = {
  onPointerDown: 'pointerdown',
  onPointerUp: 'pointerup',
  onPointerMove: 'pointermove',
  onPointerEnter: 'pointerenter',
  onPointerLeave: 'pointerleave',
  onPointerCancel: 'pointercancel',
  onDragStart: 'dragstart',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onTap: 'tap',
  onDoubleTap: 'dbltap',
  onLongPress: 'onLongPress',
}

export interface HEREMapProps extends H.Map.Options {
  appId: string
  appCode: string
  animateCenter?: boolean
  animateZoom?: boolean
  hidpi?: boolean
  interactive?: boolean
  secure?: boolean
  setLayer?: {
    layer:
      | 'map'
      | 'traffic'
      | 'panorama'
      | 'transit'
      | 'xbase'
      | 'base'
      | 'labels'
    mapType: 'normal' | 'satelite' | 'terrain'
  }
  onPointerDown?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onPointerUp?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onPointerMove?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onPointerEnter?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onPointerLeave?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onPointerCancel?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onDragStart?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onDrag?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onDragEnd?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onTap?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onDoubleTap?: (e: H.util.Event, coords: H.geo.IPoint) => void
  onLongPress?: (e: H.util.Event, coords: H.geo.IPoint) => void
}

export interface OwnState {}

export class HEREMap extends React.Component<HEREMapProps, HEREMapContext> {
  private debouncedResizeMap: any
  // public static contextType = MapContext

  constructor(props: HEREMapProps) {
    super(props)

    this.state = {
      map: undefined,
      behavior: undefined,
      ui: undefined,
    }

    this.debouncedResizeMap = debounce(this.resizeMap, 200)
  }

  public componentDidMount() {
    const { secure } = this.props

    cache(getScriptMap(secure === true))
    const stylesheetUrl = `${
      secure === true ? 'https:' : ''
    }//js.api.here.com/v3/3.0/mapsjs-ui.css`
    getLink(stylesheetUrl, 'HERE Maps UI')

    onAllLoad(() => {
      const map = this.createMap()

      window.addEventListener('resize', this.debouncedResizeMap)

      this.setState({ ...map })
    })
  }

  public componentDidUpdate(prevProps: HEREMapProps) {
    if (
      prevProps.center &&
      this.props.center &&
      (prevProps.center.lat !== this.props.center.lat ||
        prevProps.center.lng !== this.props.center.lng)
    ) {
      this.setCenter(this.props.center)
    }

    if (
      prevProps.zoom &&
      this.props.zoom &&
      prevProps.zoom !== this.props.zoom
    ) {
      this.setZoom(this.props.zoom)
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResizeMap)
  }

  public createMap = (): HEREMapContext => {
    const {
      appId,
      appCode,
      center,
      hidpi,
      interactive,
      zoom,
      secure,
      setLayer,
    } = this.props

    const platform = getPlatform({
      app_code: appCode,
      app_id: appId,
      useHTTPS: secure === true,
    })

    const defaultLayers = platform.createDefaultLayers({
      ppi: hidpi ? 320 : 72,
    })

    const mapElement = document.querySelector('.map-container')

    const HERE: HEREMapContext = {}

    let layer = defaultLayers.normal.map
    if (setLayer) {
      layer = defaultLayers[setLayer.mapType][setLayer.layer]
    }

    if (mapElement) {
      HERE.map = new H.Map(mapElement, layer, {
        center: center,
        pixelRatio: hidpi ? 2 : 1,
        zoom: zoom,
      })
      Object.entries(mapEvents).forEach(([event, hereEvent]) => {
        if (typeof this.props[event] === 'function') {
          HERE.map!.addEventListener(hereEvent, (e: any) => {
            const coords = HERE.map!.screenToGeo(
              e.currentPointer.viewportX,
              e.currentPointer.viewportY,
            )
            this.props[event](e, coords)
          })
        }
      })
      if (interactive) {
        HERE.behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(HERE.map),
        )

        HERE.ui = H.ui.UI.createDefault(HERE.map, defaultLayers)
      }
    }

    return HERE
  }

  public getElement(): Element | Text | null {
    return ReactDOM.findDOMNode(this)
  }

  public setCenter(point: H.geo.IPoint): void {
    const { animateCenter } = this.props
    const { map } = this.state
    if (map) {
      map.setCenter(point, animateCenter === true)
    }
  }

  public setZoom(zoom: number): void {
    const { animateZoom } = this.props
    const { map } = this.state
    if (map) {
      map.setZoom(zoom, animateZoom === true)
    }
  }

  private resizeMap = () => {
    const { map } = this.state
    if (map) {
      map.getViewPort().resize()
    }
  }

  public render() {
    const { map } = this.state
    const { children } = this.props

    return (
      <MapContext.Provider value={this.state}>
        <div
          className="map-container"
          id={`map-container`}
          style={{ height: '100%' }}
        >
          {map ? children : null}
        </div>
      </MapContext.Provider>
    )
  }
}

export default HEREMap
