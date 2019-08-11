import getDomMarkerIcon from 'utils/get-dom-marker-icon';

describe('get-dom-marker-icon', () => {
  it('returns the same object', () => {
    const icon = getDomMarkerIcon('test');
    expect(icon).toEqual(getDomMarkerIcon('marker'));
  });
});
