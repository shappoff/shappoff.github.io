import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicMapApp from '../featured/DynamicMapApp';

// Mock components for each mapKey
const Zalazje1943 = ({ children }: { children?: React.ReactNode }) => <div data-testid="zalazje1943">Zalazje1943{children}</div>;
const Glinniki1870 = ({ children }: { children?: React.ReactNode }) => <div data-testid="glinniki1870">Glinniki1870{children}</div>;
const Glinniki1846 = ({ children }: { children?: React.ReactNode }) => <div data-testid="glinniki1846">Glinniki1846{children}</div>;
const Bocheikovo1943 = ({ children }: { children?: React.ReactNode }) => <div data-testid="bocheikovo1943">Bocheikovo1943{children}</div>;

// Mock next/dynamic to just return the component
jest.mock('next/dynamic', () => (importFn: any, opts: any) => {
  // Simulate the import function returning a promise with a default export
  const map = {
    '@/components/featured/zalazje1943/Zalazje1943': Zalazje1943,
    '@/components/featured/Glinniki1870': Glinniki1870,
    '@/components/featured/glinniki1846/Glinniki1846': Glinniki1846,
    '@/components/featured/Bocheikovo1943': Bocheikovo1943,
  };
  // Find the key by comparing the import function's toString
  const fnStr = importFn.toString();
  const key = Object.keys(map).find(k => fnStr.includes(k));
  return map[key as keyof typeof map] || (() => <div>Unknown</div>);
});

describe('DynamicMapApp', () => {
  it('renders Zalazje1943 for mapKey="zalazje1943"', () => {
    render(<DynamicMapApp mapKey="zalazje1943" />);
    expect(screen.getByTestId('zalazje1943')).toBeInTheDocument();
  });
  it('renders Glinniki1870 for mapKey="glinniki1870"', () => {
    render(<DynamicMapApp mapKey="glinniki1870" />);
    expect(screen.getByTestId('glinniki1870')).toBeInTheDocument();
  });
  it('renders Glinniki1846 for mapKey="glinniki1846"', () => {
    render(<DynamicMapApp mapKey="glinniki1846" />);
    expect(screen.getByTestId('glinniki1846')).toBeInTheDocument();
  });
  it('renders Bocheikovo1943 for mapKey="bocheikovo1943"', () => {
    render(<DynamicMapApp mapKey="bocheikovo1943" />);
    expect(screen.getByTestId('bocheikovo1943')).toBeInTheDocument();
  });
  it('passes children to the dynamic component', () => {
    render(
      <DynamicMapApp mapKey="zalazje1943">
        <span data-testid="child">Child</span>
      </DynamicMapApp>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('zalazje1943')).toContainElement(screen.getByTestId('child'));
  });
});
