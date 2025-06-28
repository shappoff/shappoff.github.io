// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment Types
export interface Environment {
  [key: string]: string | undefined;
}

// Geolocation Types
export interface Geolocation {
  lat: number;
  lng: number;
}

export interface MapBounds {
  _northEast: Geolocation;
  _southWest: Geolocation;
  length?: number;
  getNorthEast(): Geolocation;
  getSouthWest(): Geolocation;
}

// Event Types
export interface EventTarget {
  value: string;
}

export interface SearchEvent {
  target: EventTarget;
}

export interface KeyboardEvent {
  which: number;
}

export interface MouseEvent {
  target: HTMLElement;
}

export interface LeafletEvent {
  target: any;
}

// Prikhody Types
export interface PrikhodHit {
  objectID: string;
  pType?: string;
  pTitle: string;
  title: string;
  year?: string;
  eparchy?: string;
  deanery?: string;
  _geoloc: Geolocation;
  src?: number;
  g?: string;
  u?: string;
  [key: string]: any;
}

export interface PrikhodNP {
  objectID: string;
  title: string;
  coords?: Geolocation[];
  [key: string]: any;
}

export interface PrikhodArchive {
  arTitle: string;
  description: string;
  year: string;
  note: string;
  link?: string;
}

export interface PrikhodDescription {
  nps?: PrikhodNP[];
  archives?: PrikhodArchive[];
  [key: string]: any;
}

export interface PrikhodMarkerProps {
  hit: PrikhodHit;
  popupclose: (e: LeafletEvent) => void;
  popupopen: (e: LeafletEvent) => void;
  setCurrentLocIdInPopUp: (hit: PrikhodHit) => void;
  selectCallback: (hit: PrikhodHit) => void;
  children?: React.ReactNode;
}

export interface NPPlaceMarkerProps {
  hit: PrikhodNP;
  color: string;
}

export interface NoFoundPrikhodProps {
  hit: PrikhodHit;
  setIsShowNotFoundPanel: (show: boolean) => void;
}

export interface IndicateButtonProps {
  item: PrikhodHit;
  callBack?: () => void;
  label?: string;
}

export interface FilterBarProps {
  searchHandler: (event: SearchEvent) => void;
  keysHandler: (event: KeyboardEvent) => void;
  searchTerm: string;
  isTypoTolerance: boolean;
  setIsTypoTolerance: (value: boolean) => void;
  children?: React.ReactNode;
}

export interface BoundsToMapItemsProps {
  bounds: MapBounds | null;
  callback: () => void;
}

export interface MapZoomProps {
  setMapZoom: (zoom: number) => void;
}

export interface MapBoundsProps {
  setMapBounds: (bounds: MapBounds) => void;
}

export interface SetMapSizeOnChangeProps {
  top: string;
  height: string;
}

export interface LayersControlComponentProps {
  rootWith: number;
  maps?: any;
}

export interface ThrottleState {
  savedArgs: any;
  savedThis: any;
}

// NIAB Types
export interface NIABItem {
  fod: string;
  s?: number;
  storage?: string;
  count?: number;
  lang?: string[];
  years?: string;
  _highlightResult: {
    anotation?: {
      value: string;
    };
    title: {
      value: string;
    };
  };
  [key: string]: any;
}

export interface FondCardProps {
  item: NIABItem;
  index: number;
}

export interface AlertInfoProps {
  children: React.ReactNode;
  severity?: 'error' | 'warning' | 'info' | 'success';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  style?: React.CSSProperties;
}

export interface BasicTooltipProps {
  children: React.ReactNode;
  note: string;
}

export interface DigitedPost {
  delo: string;
  comment?: string;
}

export interface OpisData {
  [key: string]: DigitedPost[];
}

export interface CustomTabPanelProps {
  digitedPosts: OpisData;
}

export interface FondyNIABAppState {
  resultsAll: NIABItem[];
  yearsRangeFilter: number[];
  yearsMinMax: [number, number];
}

// Utility Function Types
export interface GetFunction {
  (obj: Record<string, any>, propPath: string, defaultValue?: any): any;
}

export interface IsObjectFunction {
  (item: any): boolean;
}

export interface MergeDeepFunction {
  (target: Record<string, any>, ...sources: Record<string, any>[]): Record<string, any>;
}

export interface GetNestedArrayValueFunction {
  (digited: Record<string, any>, fond: string, opis: string, delo: string): boolean | null;
}

// Icon Types
export interface IconProps {
  iconColor: string;
}

// Page404 Types
export interface RouteList {
  [key: string]: string;
}

export interface Page404Props {
  routeList: RouteList;
}

// Search and Filter Types
export interface SearchResult {
  hits: PrikhodHit[];
  facets: {
    g?: Record<string, number>;
    u?: Record<string, number>;
  };
}

export interface SelectOption {
  label: string;
  value: string;
}

// Firebase Types
export interface FirebaseSnapshot {
  key: string;
  val(): any;
}

// Spreadsheet Data Types
export interface SpreadsheetRow {
  [key: string]: any;
}

export interface SpreadsheetData {
  data: {
    values: SpreadsheetRow[];
  };
}

export interface StorageData {
  [key: string]: any;
}

// Form Element Types
export interface FormElement {
  value: string;
}

// Component State Types
export interface ComponentState {
  [key: string]: any;
}

// Generic Object Types
export type GenericObject = Record<string, any>;
export type GenericArray = any[];
export type GenericFunction = (...args: any[]) => any; 