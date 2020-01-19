# 1.1.0 (January 18, 2020)

- [#20](https://github.com/ordazgustavo/here-maps-react/pull/20) feat: add map
  container id. ([@omhoumz](https://github.com/omhoumz))

# 1.0.0-beta.2 (August 11, 2019)

A complete rebuild of this library to use React Hooks internally (and in the
near future expose some hooks), add features, fix bugs, and the initial version
of the documentation.

# 0.1.3 (July 07, 2019)

Fixes issues with context API when map instance was not already defined.

- [#8](https://github.com/ordazgustavo/here-maps-react/pull/10) fix:
  conditionally show children.
  ([@ordazsgustavo](https://github.com/ordazsgustavo))

# 0.1.1 (February 19, 2019)

Add drag events feature support for Marker component.

- [#3](https://github.com/ordazgustavo/here-maps-react/pull/3) Feat/marker drag
  event. ([@ordazsgustavo](https://github.com/ordazsgustavo))

# 0.1.0 (January 30, 2019)

This release is considered a breaking change due to changes in the way the map
internal container sets it's size. Previously it was set to `100vh` so it would
allways take the full window height, now it is set to `100%` so it adapts to the
container size set by the user.

- [#1](https://github.com/ordazgustavo/here-maps-react/pull/1) Change vh to
  percent. ([@ordazsgustavo](https://github.com/ordazsgustavo))
- [#2](https://github.com/ordazgustavo/here-maps-react/pull/2) Remove Lodash
  dependency. ([@ordazsgustavo](https://github.com/ordazsgustavo))

# 0.0.1 (January 23, 2019)

Project release.
