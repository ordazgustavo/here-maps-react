/**
 * A helper function that disables map behavior on drag event in order to allow
 * the marker to be moved.
 * @param map
 * @param behavior
 */
export function setMarkerDragEvent(map: H.Map, behavior: H.mapevents.Behavior) {
  map.addEventListener(
    'dragstart',
    (e: H.util.Event) => {
      if (
        e.target instanceof H.map.Marker ||
        e.target instanceof H.map.DomMarker
      ) {
        behavior.disable();
      }
    },
    false,
  );

  map.addEventListener(
    'dragend',
    (e: H.util.Event) => {
      if (
        e.target instanceof H.map.Marker ||
        e.target instanceof H.map.DomMarker
      ) {
        behavior.enable();
      }
    },
    false,
  );

  map.addEventListener(
    'drag',
    (e: any) => {
      const target = e.target;
      const pointer = e.currentPointer;
      if (
        target instanceof H.map.Marker ||
        e.target instanceof H.map.DomMarker
      ) {
        target.setPosition(
          map.screenToGeo(pointer.viewportX, pointer.viewportY),
        );
      }
    },
    false,
  );
}
