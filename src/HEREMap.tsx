import React from 'react'
import ReactDOM from 'react-dom'

import cache, { onAllLoad } from './utils/cache'
import debounce from './utils/debounce'
import getLink from './utils/get-link'
import getScriptMap from './utils/get-script-map'
import MapContext, { HEREMapContext } from './utils/map-context'
import getPlatform from './utils/get-platform'

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
}

export interface OwnState {}

type State = OwnState & HEREMapContext

export class HEREMap extends React.Component<HEREMapProps, State> {
  public state: State = {
    map: null,
    behavior: null,
    ui: null,
  }
  private debouncedResizeMap: any
  public static contextType = MapContext
  public context: HEREMapContext

  constructor(props: HEREMapProps, context: HEREMapContext) {
    super(props, context)

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

    const HERE: HEREMapContext = {
      map: null,
      behavior: null,
      ui: null,
    }

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
    const { map } = this.context
    if (map) {
      map.setCenter(point, animateCenter === true)
    }
  }

  public setZoom(zoom: number): void {
    const { animateZoom } = this.props
    const { map } = this.context
    if (map) {
      map.setZoom(zoom, animateZoom === true)
    }
  }

  private resizeMap = () => {
    const { map } = this.context
    if (map) {
      map.getViewPort().resize()
    }
  }

  public render() {
    const { children } = this.props

    return (
      <MapContext.Provider value={this.state}>
        <div
          className="map-container"
          id={`map-container`}
          style={{ height: '100%' }}
        >
          {children}
        </div>
      </MapContext.Provider>
    )
  }
}

export default HEREMap
