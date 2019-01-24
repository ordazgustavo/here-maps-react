import React from 'react'

export interface HEREMapContext {
  map: H.Map | null
  behavior: H.mapevents.Behavior | null
  ui: H.ui.UI | null
}

const MapContext = React.createContext<HEREMapContext>({
  map: null,
  behavior: null,
  ui: null,
})

export default MapContext
