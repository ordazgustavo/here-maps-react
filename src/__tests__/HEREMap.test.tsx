import React from 'react';
import { render } from '@testing-library/react';

import HEREMap from '../HEREMap';
import Marker from '../Marker';
import RouteLine from '../RouteLine';
import Circle from '../Circle';

const apikey = '';

describe('HEREMap', () => {
  it('renders with required props', () => {
    const { getByTestId } = render(<HEREMap apikey={apikey} />);
    expect(getByTestId('map-container')).toBeTruthy();
  });

  it('renders with Marker', () => {
    const { getByTestId } = render(
      <HEREMap apikey={apikey}>
        <Marker lat={-12.1199408} lng={-77.037241} />
      </HEREMap>,
    );
    expect(getByTestId('map-container')).toBeTruthy();
  });

  it('renders with RouteLine', () => {
    const { getByTestId } = render(
      <HEREMap apikey={apikey}>
        <RouteLine shape={['1,2']} />
      </HEREMap>,
    );
    expect(getByTestId('map-container')).toBeTruthy();
  });

  it('renders with Circle', () => {
    const { getByTestId } = render(
      <HEREMap apikey={apikey}>
        <Circle radius={10} lat={-12.1199408} lng={-77.037241} />
      </HEREMap>,
    );
    expect(getByTestId('map-container')).toBeTruthy();
  });
});
