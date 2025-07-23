import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoricalMap from '../shared/HistoricalMap';

// Mock react-leaflet components
const mapContainerMock = jest.fn(({ children, ...props }) => (
  <div data-testid="map-container"> {children} </div>
));
const tileLayerMock = jest.fn((props) => <div data-testid="tile-layer" />);

jest.mock('react-leaflet', () => ({
  MapContainer: (props: any) => mapContainerMock(props),
  TileLayer: (props: any) => tileLayerMock(props),
}));

describe('HistoricalMap', () => {
  const baseProps = {
    center: [51.505, -0.09] as [number, number],
    zoom: 5,
    tileUrl: 'https://tileserver.com/{z}/{x}/{y}.png',
    attribution: 'Map data © OpenStreetMap contributors',
  };

  beforeEach(() => {
    mapContainerMock.mockClear();
    tileLayerMock.mockClear();
  });

  it('renders without crashing with required props', () => {
    render(<HistoricalMap {...baseProps} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
  });

  it('passes props to MapContainer and TileLayer', () => {
    render(
      <HistoricalMap
        {...{ ...baseProps, center: [51.505, -0.09] as [number, number] }}
        minZoom={3}
        maxZoom={7}
        style={{ height: '500px' }}
        id="custom-map"
        zoomControl={false}
      />
    );
    // Check MapContainer props
    const mapProps = mapContainerMock.mock.calls[0][0];
    expect(mapProps.id).toBe('custom-map');
    expect(mapProps.zoom).toBe(5);
    expect(mapProps.minZoom).toBe(3);
    expect(mapProps.maxZoom).toBe(7);
    expect(mapProps.zoomControl).toBe(false);
    expect(mapProps.style).toEqual({ height: '500px' });
    // Check TileLayer props
    const tileProps = tileLayerMock.mock.calls[0][0];
    expect(tileProps.url).toBe(baseProps.tileUrl);
    expect(tileProps.attribution).toBe(baseProps.attribution);
    expect(tileProps.maxZoom).toBe(7);
    expect(tileProps.minZoom).toBe(3);
    expect(tileProps.noWrap).toBe(true);
  });

  it('renders children inside MapContainer', () => {
    render(
      <HistoricalMap {...baseProps}>
        <div data-testid="child">Child Content</div>
      </HistoricalMap>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('calls whenReady if provided', () => {
    const whenReady = jest.fn();
    render(<HistoricalMap {...baseProps} whenReady={whenReady} />);
    const mapProps = mapContainerMock.mock.calls[0][0];
    expect(mapProps.whenReady).toBe(whenReady);
  });

  it('uses default props when not provided', () => {
    render(<HistoricalMap {...baseProps} />);
    const mapProps = mapContainerMock.mock.calls[0][0];
    const tileProps = tileLayerMock.mock.calls[0][0];
    expect(mapProps.minZoom).toBe(2);
    expect(mapProps.maxZoom).toBe(6);
    expect(mapProps.id).toBe('map');
    expect(mapProps.zoomControl).toBe(true);
    expect(tileProps.maxZoom).toBe(6);
    expect(tileProps.minZoom).toBe(2);
  });
});
