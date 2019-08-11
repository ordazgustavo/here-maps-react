import getMarkerIcon from 'utils/get-marker-icon';

describe('get-dom-marker-icon', () => {
  it('returns the same object', () => {
    const icon = getMarkerIcon('test');
    expect(icon).toEqual(getMarkerIcon('marker'));
  });
});
