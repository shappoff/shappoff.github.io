import {
  getNickName,
  get,
  isObject,
  mergeDeep,
  stringToColour,
  timeout,
  copyToClipboard,
  getNestedArrayValue,
  create_geoloc,
  fondNmbToObjectId,
} from '../utils';

describe('utils', () => {
  describe('getNickName', () => {
    const originalLocalStorage = global.localStorage;
    beforeEach(() => {
      let store: Record<string, string> = {};
      global.localStorage = {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value; }),
        removeItem: jest.fn((key) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
        key: jest.fn(),
        length: 0,
      } as any;
    });
    afterEach(() => {
      global.localStorage = originalLocalStorage;
    });
    it('returns nickname from email', () => {
      expect(getNickName('john@example.com')).toBe('john');
    });
    it('returns nickname from localStorage if email is not provided', () => {
      global.localStorage.setItem('user', 'jane@domain.com');
      expect(getNickName()).toBe('jane');
    });
    it('returns anonymous if nothing is found', () => {
      global.localStorage.clear();
      expect(getNickName(null)).toBe('anonymous');
    });
  });

/*
  describe('get', () => {
    const obj = { a: { b: { c: 42 } }, d: 0 };
    it('gets nested property by path', () => {
      expect(get(obj, 'a.b.c')).toBe(42);
    });
    it('returns default value if path not found', () => {
      expect(get(obj, 'a.b.x', 'default')).toBe('default');
    });
    it('returns undefined if path not found and no default', () => {
      expect(get(obj, 'a.b.x')).toBeUndefined();
    });
    it('works for top-level property', () => {
      expect(get(obj, 'd')).toBe(obj.d);
    });
  });
*/

  describe('isObject', () => {
    it('returns true for plain object', () => {
      expect(isObject({})).toBe(true);
    });
    it('returns false for array', () => {
      expect(isObject([])).toBe(false);
    });
    it('returns false for null', () => {
      expect(isObject(null)).toBe(false);
    });
    it('returns false for primitive', () => {
      expect(isObject(42)).toBe(false);
      expect(isObject('str')).toBe(false);
    });
  });

  describe('mergeDeep', () => {
    it('deep merges objects', () => {
      const a: Record<string, any> = { foo: { bar: 1 }, obj: { x: 1 } };
      const b: Record<string, any> = { foo: { baz: 2 }, obj: { y: 2 }, extra: true };
      const result = mergeDeep(a, b);
      expect(result).toEqual({ foo: { bar: 1, baz: 2 }, obj: { x: 1, y: 2 }, extra: true });
    });
    it('merges multiple sources', () => {
      const a: Record<string, any> = { a: 1 };
      const b: Record<string, any> = { b: 2 };
      const c: Record<string, any> = { c: 3 };
      expect(mergeDeep(a, b, c)).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('stringToColour', () => {
    it('returns a color string for a given string', () => {
      expect(stringToColour('test')).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(stringToColour('another')).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
    it('returns same color for same string', () => {
      expect(stringToColour('repeat')).toBe(stringToColour('repeat'));
    });
    it('returns different color for different strings', () => {
      expect(stringToColour('a')).not.toBe(stringToColour('b'));
    });
  });

  describe('timeout', () => {
    it('resolves after given ms', async () => {
      const start = Date.now();
      await timeout(10);
      expect(Date.now() - start).toBeGreaterThanOrEqual(10);
    });
  });

  describe('copyToClipboard', () => {
    let originalClipboard: any;
    beforeEach(() => {
      originalClipboard = global.navigator.clipboard;
      Object.defineProperty(global.navigator, 'clipboard', {
        value: {
          writeText: jest.fn(() => Promise.resolve()),
        },
        configurable: true,
      });
    });
    afterEach(() => {
      Object.defineProperty(global.navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      });
    });
    it('calls writeText and callback', async () => {
      const callback = jest.fn();
      await copyToClipboard('  hello ', callback);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
      // callback is called asynchronously
      await Promise.resolve();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('getNestedArrayValue', () => {
    const digited = { fond1: { opis1: { delo1: true } } };
    it('returns true if all keys exist', () => {
      expect(getNestedArrayValue(digited, 'fond1', 'opis1', 'delo1')).toBe(true);
    });
    it('returns null if digited is undefined', () => {
      expect(getNestedArrayValue(undefined, 'f', 'o', 'd')).toBeNull();
    });
    it('returns null if fond is missing', () => {
      expect(getNestedArrayValue({}, 'f', 'o', 'd')).toBeNull();
    });
    it('returns null if opis is missing', () => {
      expect(getNestedArrayValue({ fond1: {} }, 'fond1', 'opis1', 'delo1')).toBeNull();
    });
    it('returns null if delo is missing', () => {
      expect(getNestedArrayValue({ fond1: { opis1: {} } }, 'fond1', 'opis1', 'delo1')).toBeNull();
    });
  });

  describe('create_geoloc', () => {
    it('returns object with lat/lng as numbers', () => {
      expect(create_geoloc('10.5', '20.7')).toEqual({ lat: 10.5, lng: 20.7 });
    });
    it('returns empty object if lat or lng is missing', () => {
      expect(create_geoloc('', '20')).toEqual({});
      expect(create_geoloc('10', '')).toEqual({});
    });
    it('trims input strings', () => {
      expect(create_geoloc(' 1 ', ' 2 ')).toEqual({ lat: 1, lng: 2 });
    });
  });

  describe('fondNmbToObjectId', () => {
    it('pads single digit with three zeros', () => {
      expect(fondNmbToObjectId('5')).toBe('0005');
    });
    it('pads two digits with two zeros', () => {
      expect(fondNmbToObjectId('12')).toBe('0012');
    });
    it('pads three digits with one zero', () => {
      expect(fondNmbToObjectId('123')).toBe('0123');
    });
    it('returns four digits as is', () => {
      expect(fondNmbToObjectId('1234')).toBe('1234');
    });
    it('returns longer strings as is', () => {
      expect(fondNmbToObjectId('12345')).toBe('12345');
    });
    it('handles empty string', () => {
      expect(fondNmbToObjectId('')).toBe('');
    });
  });
});

describe('plural', () => {
  it('returns correct form for 1', () => {
    expect(require('../utils').plural(1)).toBe('фонд');
  });
  it('returns correct form for 2', () => {
    expect(require('../utils').plural(2)).toBe('фонда');
  });
  it('returns correct form for 5', () => {
    expect(require('../utils').plural(5)).toBe('фондов');
  });
  it('returns correct form for 21', () => {
    expect(require('../utils').plural(21)).toBe('фонд');
  });
  it('returns correct form for 12', () => {
    expect(require('../utils').plural(12)).toBe('фондов');
  });
  it('works with custom titles', () => {
    expect(require('../utils').plural(1, ['cat', 'cats', 'catses'])).toBe('cat');
    expect(require('../utils').plural(2, ['cat', 'cats', 'catses'])).toBe('cats');
    expect(require('../utils').plural(5, ['cat', 'cats', 'catses'])).toBe('catses');
  });
});

describe('openInNewTab', () => {
  let originalOpen: any;
  beforeAll(() => {
    originalOpen = window.open;
  });
  afterAll(() => {
    window.open = originalOpen;
  });
  it('calls window.open with correct params and sets opener to null', () => {
    const mockWindow = { opener: {}, };
    const url = 'https://example.com';
    window.open = jest.fn(() => mockWindow as any);
    const result = require('../utils').openInNewTab(url);
    expect(window.open).toHaveBeenCalledWith(url, '_blank', 'noopener,noreferrer,width=400,height=400');
    expect(result.opener).toBeNull();
  });
  it('returns null if window.open returns null', () => {
    window.open = jest.fn(() => null);
    const result = require('../utils').openInNewTab('https://example.com');
    expect(result).toBeNull();
  });
});
