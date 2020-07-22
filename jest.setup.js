require('@testing-library/jest-dom/extend-expect');

class Platform {
  createDefaultLayers() {
    return {
      vector: {
        normal: {
          map: {},
          traffic: {},
          trafficincidents: {},
        }
      },
      raster: {
        normal: {},
        satellite: {},
        terrain: {},
      }
    };
  }
}

class Map {
  addObject() {}
  removeObject() {}
}

class Circle {
  setRadius() {}
  setCenter() {}
}
class DomIcon {}
class Icon {}
class Marker {
  setGeometry() {}
}
class DomMarker extends Marker {}
class Polyline {}

class LineString {
  pushLatLngAlt() {}
}

global.H = {
  service: {
    Platform,
  },
  Map,
  map: {
    Circle,
    DomIcon,
    DomMarker,
    Icon,
    Marker,
    Polyline,
  },
  geo: {
    LineString,
  },
};
