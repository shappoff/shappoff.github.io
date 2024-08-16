/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5802:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(6540));
var DropDownComponent_1 = __webpack_require__(3191);
var TableResults_1 = __webpack_require__(6397);
var HashRoute_1 = __webpack_require__(6992);
var react_leaflet_1 = __webpack_require__(2745);
var react_leaflet_cluster_1 = __importDefault(__webpack_require__(9875));
__webpack_require__(1780);
__webpack_require__(2508);
var react_dom_1 = __webpack_require__(961);
var LayersControlComponent_1 = __importDefault(__webpack_require__(7405));
var useWindowSize_1 = __webpack_require__(877);
var SetMapSizeOnChange_1 = __importDefault(__webpack_require__(7073));
var PlaceMarker_1 = __importDefault(__webpack_require__(7500));
var useMarkersBounds_1 = __importDefault(__webpack_require__(9174));
var BoundsToMapItems_1 = __importDefault(__webpack_require__(7757));
var react_bootstrap_1 = __webpack_require__(5583);
var applicationID1 = '0Z0CX04G3B', searchOnlyAPIKey1 = 'fa5e1533db6da6814c493bdcf83cb97c', applicationID2 = 'JG19C3YKDI', searchOnlyAPIKey2 = '6fd8d3369279ccd237ecfddc10d5fe2e', index_name = 'uezdy';
var HASH_MAP = {
    uezd: 'u',
    volost: 'v',
    owner: 'o',
    church: 'c',
    query: 'q',
    isMap: 'm',
};
var algoliasearch = __webpack_require__(4938);
var client = algoliasearch(applicationID1, searchOnlyAPIKey1);
var client2 = algoliasearch(applicationID2, searchOnlyAPIKey2);
var currentAlgoliaIndex = client.initIndex(index_name);
var currentAlgoliaIndex2 = client2.initIndex(index_name);
var App = function () {
    var _a = react_1.default.useState(false), isMap = _a[0], setIsMap = _a[1];
    var _b = react_1.default.useState(false), isInited = _b[0], setIsInited = _b[1];
    var _c = react_1.default.useState(''), value = _c[0], setValue = _c[1];
    var _d = react_1.default.useState({}), facetsUezd = _d[0], setFacetsUezd = _d[1];
    var _e = react_1.default.useState([]), uezdFilter = _e[0], setUezdFilter = _e[1];
    var _f = react_1.default.useState({}), facetsVolost = _f[0], setFacetsVolost = _f[1];
    var _g = react_1.default.useState([]), volostFilter = _g[0], setVolostFilter = _g[1];
    var _h = react_1.default.useState({}), facetsOwner = _h[0], setFacetsOwner = _h[1];
    var _j = react_1.default.useState({}), facetsPrikhods = _j[0], setPrikhods = _j[1];
    var _k = react_1.default.useState([]), ownerFilter = _k[0], setOwnerFilter = _k[1];
    var _l = react_1.default.useState([]), prikhodsFilter = _l[0], setPrikhodsFilter = _l[1];
    var _m = react_1.default.useState([]), hits = _m[0], setHits = _m[1];
    var _o = react_1.default.useState(), route = _o[0], setRoute = _o[1];
    var _p = react_1.default.useState(false), isShowPanel = _p[0], setIsShowPanel = _p[1];
    var size = (0, useWindowSize_1.useWindowSize)();
    var currentBounds = (0, useMarkersBounds_1.default)(hits);
    var getFacetFilters = function () {
        var facetFilters = [];
        var facetFiltersAnalytics = [];
        if (uezdFilter.length) {
            facetFiltersAnalytics.push.apply(facetFiltersAnalytics, uezdFilter);
            facetFilters.push(__spreadArray([], uezdFilter.map(function (uezd) { return "uezd:".concat(uezd); }), true));
        }
        if (volostFilter.length) {
            facetFiltersAnalytics.push.apply(facetFiltersAnalytics, volostFilter);
            facetFilters.push(__spreadArray([], volostFilter.map(function (volost) { return "volost:".concat(volost); }), true));
        }
        if (ownerFilter.length) {
            facetFiltersAnalytics.push.apply(facetFiltersAnalytics, ownerFilter);
            facetFilters.push(__spreadArray([], ownerFilter.map(function (ownerTitle) { return "ownerTitle:".concat(ownerTitle); }), true));
        }
        if (prikhodsFilter.length) {
            facetFiltersAnalytics.push.apply(facetFiltersAnalytics, prikhodsFilter.map(function (item) { return item.split(',')[0]; }));
            facetFilters.push(__spreadArray([], prikhodsFilter.map(function (ownerTitle) { return "prikhodTitle:".concat(ownerTitle); }), true));
        }
        if (!uezdFilter.length && !volostFilter.length && !ownerFilter.length && !prikhodsFilter.length) {
            // facetFilters.push(['npType:село', 'npType:местечко']);
        }
        return { facetFilters: facetFilters, facetFiltersAnalytics: facetFiltersAnalytics };
    };
    var getQuery = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, facetFilters, facetFiltersAnalytics, isFiltersSelected, selectedFilters, term_facet_filters;
        return __generator(this, function (_b) {
            _a = getFacetFilters(), facetFilters = _a.facetFilters, facetFiltersAnalytics = _a.facetFiltersAnalytics;
            if (value.length > 3) {
                isFiltersSelected = !!facetFiltersAnalytics.length;
                selectedFilters = isFiltersSelected ? "[".concat(facetFiltersAnalytics.join('|'), "]") : '';
                term_facet_filters = "".concat(value, ":").concat(selectedFilters);
                /*
                            analytics.logEvent('search', {
                                search_term: value,
                                selected_filters: selectedFilters,
                                nickname: userNickName,
                                term_filters_nickname: term_facet_filters,
                                term_facet_filters
    
                            });
                */
            }
            currentAlgoliaIndex.search(value, {
                facets: ['*'],
                facetFilters: facetFilters
            }).then(function (_a) {
                var hits1 = _a.hits, facets1 = _a.facets;
                setHits(function (hits) { return __spreadArray(__spreadArray([], hits, true), hits1, true); });
                setFacetsUezd(function (uezd) { return Object.assign({}, uezd, facets1.uezd); });
                setFacetsVolost(function (volost) { return Object.assign({}, volost, facets1.volost); });
                setFacetsOwner(function (ownerTitle) { return Object.assign({}, ownerTitle, facets1.ownerTitle); });
                setPrikhods(function (prikhodTitle) { return Object.assign({}, prikhodTitle, facets1.prikhodTitle); });
            });
            currentAlgoliaIndex2.search(value, {
                facets: ['*'],
                facetFilters: facetFilters
            }).then(function (_a) {
                var hits2 = _a.hits, facets2 = _a.facets;
                setHits(function (hits) { return __spreadArray(__spreadArray([], hits, true), hits2, true); });
                setFacetsUezd(function (uezd) { return Object.assign({}, uezd, facets2.uezd); });
                setFacetsVolost(function (volost) { return Object.assign({}, volost, facets2.volost); });
                setFacetsOwner(function (ownerTitle) { return Object.assign({}, ownerTitle, facets2.ownerTitle); });
                setPrikhods(function (prikhodTitle) { return Object.assign({}, prikhodTitle, facets2.prikhodTitle); });
            });
            return [2 /*return*/];
        });
    }); };
    var _q = react_1.default.useState(0), rootWith = _q[0], setRootWith = _q[1];
    var _r = react_1.default.useState(0), filterBarHeight = _r[0], setFilterBarHeight = _r[1];
    var _s = react_1.default.useState(0), footerHeight = _s[0], setFooterHeight = _s[1];
    react_1.default.useEffect(function () {
        var filterBar = document.getElementById('filter-bar');
        var footerHeight = document.getElementById('footer-info-panel');
        var root = document.getElementById('root');
        if (filterBar) {
            setFilterBarHeight(filterBar.clientHeight);
        }
        if (footerHeight) {
            setFooterHeight(footerHeight.clientHeight);
        }
        if (root) {
            setRootWith(root.clientWidth);
        }
    }, [size]);
    react_1.default.useEffect(function () {
        /*
                analytics.logEvent('page_view', {
                    nickname: userNickName,
                    page_view_data: `Table Page: ${userNickName}`
                });
        */
        var effRouter = new HashRoute_1.HashRoute(window.location.href);
        setUezdFilter(effRouter.take(HASH_MAP.uezd).split(HashRoute_1.SPLITTER).filter(function (e) { return e; }));
        setVolostFilter(effRouter.take(HASH_MAP.volost).split(HashRoute_1.SPLITTER).filter(function (e) { return e; }));
        setOwnerFilter(effRouter.take(HASH_MAP.owner).split(HashRoute_1.SPLITTER).filter(function (e) { return e; }));
        setPrikhodsFilter(effRouter.take(HASH_MAP.church).split(HashRoute_1.SPLITTER).filter(function (e) { return e; }));
        setIsMap(!!effRouter.take(HASH_MAP.isMap));
        setValue(effRouter.take(HASH_MAP.query));
        setRoute(effRouter);
        setIsInited(true);
    }, []);
    react_1.default.useEffect(function () {
        if (route) {
            route.add(HASH_MAP.uezd, uezdFilter.join(HashRoute_1.SPLITTER));
            route.add(HASH_MAP.volost, volostFilter.join(HashRoute_1.SPLITTER));
            route.add(HASH_MAP.owner, ownerFilter.join(HashRoute_1.SPLITTER));
            route.add(HASH_MAP.church, prikhodsFilter.join(HashRoute_1.SPLITTER));
            route.add(HASH_MAP.query, value);
        }
        if (isInited) {
            setHits([]);
            setFacetsUezd({});
            setFacetsVolost({});
            setFacetsOwner({});
            setPrikhods({});
            getQuery();
        }
    }, [uezdFilter, volostFilter, ownerFilter, prikhodsFilter, value, isInited]);
    var searchHandler = function (_a) {
        var target = _a.target;
        setValue(target.value);
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_leaflet_1.MapContainer, { attributionControl: false, id: "map", center: [53.902287, 27.561824], zoom: 11, trackResize: true, scrollWheelZoom: true, zoomControl: false, style: { position: 'relative', height: '100vh' } },
            react_1.default.createElement(SetMapSizeOnChange_1.default, { top: "".concat(filterBarHeight, "px"), height: "calc(100vh - ".concat(filterBarHeight, "px - ").concat(footerHeight, "px)") }),
            react_1.default.createElement(BoundsToMapItems_1.default, { bounds: currentBounds, callback: function () {
                } }),
            react_1.default.createElement(LayersControlComponent_1.default, null),
            react_1.default.createElement(react_leaflet_cluster_1.default, { chunkedLoading: true }, hits.map(function (hit) {
                if (hit && hit._geoloc && hit._geoloc.lat) {
                    return react_1.default.createElement(PlaceMarker_1.default, { hit: hit });
                }
                else {
                    return react_1.default.createElement(react_1.default.Fragment, null);
                }
            })),
            (0, react_dom_1.createPortal)(react_1.default.createElement("div", { id: "filter-bar" },
                react_1.default.createElement("input", { autoFocus: true, onChange: searchHandler, type: "text", value: value, id: "input", placeholder: "\u0434\u0435\u0440\u0435\u0432\u043D\u044F, \u0441\u0435\u043B\u043E, \u0438\u043C\u0435\u043D\u0438\u0435" }),
                react_1.default.createElement(DropDownComponent_1.DropDownComponent, { placeholder: "\u0423\u0435\u0437\u0434", items: facetsUezd ? Object.keys(facetsUezd).map(function (facet) { return ({
                        value: facet,
                        label: facet
                    }); }) : [], changeHandler: function (e) { return setUezdFilter(e.map(function (_a) {
                        var value = _a.value;
                        return value;
                    })); }, defaultValue: uezdFilter }),
                react_1.default.createElement(DropDownComponent_1.DropDownComponent, { placeholder: "\u0412\u043E\u043B\u043E\u0441\u0442\u044C", items: facetsVolost ? Object.keys(facetsVolost).map(function (facet) { return ({
                        value: facet,
                        label: facet
                    }); }) : [], changeHandler: function (e) { return setVolostFilter(e.map(function (_a) {
                        var value = _a.value;
                        return value;
                    })); }, defaultValue: volostFilter }),
                react_1.default.createElement(DropDownComponent_1.DropDownComponent, { placeholder: "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446", items: facetsOwner ? Object.keys(facetsOwner).map(function (facet) { return ({
                        value: facet,
                        label: facet
                    }); }) : [], changeHandler: function (e) { return setOwnerFilter(e.map(function (_a) {
                        var value = _a.value;
                        return value;
                    })); }, defaultValue: ownerFilter }),
                react_1.default.createElement(DropDownComponent_1.DropDownComponent, { placeholder: "\u0426\u0435\u0440\u043A\u043E\u0432\u044C", items: facetsPrikhods ? Object.keys(facetsPrikhods).map(function (facet) { return ({
                        value: facet,
                        label: facet
                    }); }) : [], changeHandler: function (e) { return setPrikhodsFilter(e.map(function (_a) {
                        var value = _a.value;
                        return value;
                    })); }, defaultValue: prikhodsFilter })), document.getElementById("filter-bar-anchor")),
            (0, react_dom_1.createPortal)(react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("ul", { className: "nav nav-tabs" },
                    react_1.default.createElement("li", { className: "nav-item" },
                        react_1.default.createElement("a", { className: !isMap ? 'nav-link active' : 'nav-link', onClick: function () {
                                setIsShowPanel(function (v) { return !v; });
                            }, "aria-current": "page", href: "#" }, "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432"))),
                react_1.default.createElement(react_bootstrap_1.Modal, { show: isShowPanel, fullscreen: true, onHide: function () { return setIsShowPanel(false); } },
                    react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true, className: "modal-header-box" }, "\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432"),
                    react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                        react_1.default.createElement(TableResults_1.TableResults, { hits: hits })))), document.getElementById("footer-info-panel"))));
};
exports["default"] = App;


/***/ }),

/***/ 7757:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_leaflet_1 = __webpack_require__(2745);
var react_1 = __importDefault(__webpack_require__(6540));
var BoundsToMapItems = function (_a) {
    var bounds = _a.bounds, callback = _a.callback;
    var map = (0, react_leaflet_1.useMap)();
    react_1.default.useEffect(function () {
        var ms = setTimeout(function () {
            bounds && map.fitBounds(bounds);
        }, 100);
        return function () {
            ms && clearTimeout(ms);
        };
    }, [bounds]);
    var baselayerchangeHandler = function (e) {
        callback && callback(e, map);
    };
    react_1.default.useEffect(function () {
        map.on("baselayerchange", baselayerchangeHandler);
        return function () {
            map.off("baselayerchange", baselayerchangeHandler);
        };
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports["default"] = BoundsToMapItems;


/***/ }),

/***/ 3191:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DropDownComponent = void 0;
var react_1 = __importDefault(__webpack_require__(6540));
var react_select_1 = __importDefault(__webpack_require__(1163));
var DropDownComponent = function (_a) {
    var items = _a.items, changeHandler = _a.changeHandler, _b = _a.placeholder, placeholder = _b === void 0 ? '' : _b, _c = _a.defaultValue, defaultValue = _c === void 0 ? [] : _c;
    if (!items.length) {
        return react_1.default.createElement("div", { style: { height: '36px' } });
    }
    var ddd = defaultValue.length ? { defaultValue: items.filter(function (item) { return ~defaultValue.indexOf(item.value); }) } : {};
    return (react_1.default.createElement(react_select_1.default, __assign({}, ddd, { isMulti: true, name: "colors", options: items, className: "basic-multi-select", classNamePrefix: "select", placeholder: placeholder, onChange: changeHandler })));
};
exports.DropDownComponent = DropDownComponent;


/***/ }),

/***/ 6992:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HashRoute = exports.SPLITTER = void 0;
exports.SPLITTER = '-|';
var HashRoute = /** @class */ (function () {
    function HashRoute(href) {
        this.url = new URL(href);
    }
    HashRoute.prototype.add = function (key, value) {
        if (value) {
            this.url.searchParams.set(key, value);
        }
        else {
            this.url.searchParams.delete(key);
        }
        this.updateAll();
    };
    HashRoute.prototype.take = function (key) {
        return this.url.searchParams.get(key) || '';
    };
    HashRoute.prototype.updateAll = function () {
        history.pushState({}, "", this.url);
    };
    return HashRoute;
}());
exports.HashRoute = HashRoute;


/***/ }),

/***/ 7405:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(6540));
var react_leaflet_1 = __webpack_require__(2745);
var LayersControlComponent = function (_a) {
    var _b = _a.rootWith, rootWith = _b === void 0 ? 1000 : _b;
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_leaflet_1.LayersControl, { position: "bottomright", collapsed: rootWith < 600 },
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "OSM" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" })),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { checked: true, name: "OSM + \u0420\u041A\u041A\u0410" },
                react_1.default.createElement(react_leaflet_1.LayerGroup, null,
                    react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", maxZoom: 10 }),
                    react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://raw.githubusercontent.com/indexby/storage/rkka_v4/tiles/Z{z}/{y}/{x}.jpg", minZoom: 11, maxZoom: 14 }))),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "\u041F\u0413\u041C" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://raw.githubusercontent.com/indexby/storage/pgm_vekzhg/tiles/Z{z}/{y}/{x}.jpg", maxZoom: 14 })),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "3-\u0432\u0435\u0440\u0441\u0442\u043A\u0430 (1)" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://raw.githubusercontent.com/indexby/storage/3v_jun20/tiles/Z{z}/{y}/{x}.jpg", maxZoom: 13 })),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "3-\u0432\u0435\u0440\u0441\u0442\u043A\u0430 (2)" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://raw.githubusercontent.com/indexby/storage/3v_jan20/tiles/Z{z}/{y}/{x}.jpg", maxZoom: 13 })),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "\u0420\u041A\u041A\u0410" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://raw.githubusercontent.com/indexby/storage/rkka_v4/tiles/Z{z}/{y}/{x}.jpg", maxZoom: 14 })),
            react_1.default.createElement(react_leaflet_1.LayersControl.BaseLayer, { name: "Google" },
                react_1.default.createElement(react_leaflet_1.TileLayer, { url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }))));
};
exports["default"] = LayersControlComponent;


/***/ }),

/***/ 7500:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var leaflet_1 = __importDefault(__webpack_require__(3481));
var DivIcon = leaflet_1.default.DivIcon;
var telegramBotToken = '1292036998:AAFkWJVt6GuU3-pyreWE-Xa8LMp4y9d0WgE', telegramChatId = '162676802';
var react_leaflet_1 = __webpack_require__(2745);
var react_1 = __importDefault(__webpack_require__(6540));
var PlaceMarker = function (_a) {
    var hit = _a.hit;
    var map = (0, react_leaflet_1.useMap)();
    var npTitle = hit.npTitle, _geoloc = hit._geoloc, short = hit.short, uezd = hit.uezd, volost = hit.volost, ownerTitle = hit.ownerTitle, npType = hit.npType, _b = hit.mentions, mentions = _b === void 0 ? [] : _b;
    var lat = _geoloc.lat, lng = _geoloc.lng;
    return react_1.default.createElement(react_leaflet_1.Marker, { title: "".concat(npType ? "".concat(npType, " ") : '').concat(npTitle).concat(ownerTitle ? ", ".concat(ownerTitle, " \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E") : '').concat(volost ? ", ".concat(volost, " \u0432\u043E\u043B\u043E\u0441\u0442\u044C") : '').concat(uezd ? ", ".concat(uezd, " \u0443\u0435\u0437\u0434") : ''), icon: new DivIcon({
            html: "<b>".concat(npTitle, "</b>"),
            className: 'marker-div-icon'
        }), position: [lat, lng] },
        react_1.default.createElement(react_leaflet_1.Popup, { closeButton: true, closeOnClick: true, closeOnEscapeKey: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement("b", null,
                    react_1.default.createElement("div", null,
                        npType,
                        " ",
                        npTitle)),
                react_1.default.createElement("div", null,
                    volost ? react_1.default.createElement("div", null,
                        volost,
                        " \u0432\u043E\u043B\u043E\u0441\u0442\u044C") : '',
                    uezd ? react_1.default.createElement("div", null,
                        uezd,
                        " \u0443\u0435\u0437\u0434") : '')),
            react_1.default.createElement("footer", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { title: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u044D\u0433 \u0438 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B", onClick: function () {
                            var line = "".concat(npTitle, ";").concat(npType, ";;").concat(volost, ";").concat(uezd);
                            if (_geoloc && _geoloc.lat && _geoloc.lng) {
                                var _a = _geoloc || {}, lat_1 = _a.lat, lng_1 = _a.lng;
                                var coords = "".concat(line, "\t").concat(lat_1, ",").concat(lng_1);
                                try {
                                    navigator.clipboard.writeText(coords);
                                    map.closePopup();
                                }
                                catch (err) {
                                    console.error('Failed to copy: ', err);
                                }
                            }
                        }, className: "copy-icon" },
                        react_1.default.createElement("svg", { version: "1.1", id: "Layer_1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", height: "10px", width: "10px", viewBox: "0 0 115.77 122.88" },
                            react_1.default.createElement("g", null,
                                react_1.default.createElement("path", { className: "st0", d: "M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" }))))),
                react_1.default.createElement("div", { className: "indicate-button", onClick: function () {
                        var mapElement = document.getElementById('map');
                        leaflet_1.default.DomUtil.addClass(mapElement, 'crosshair-cursor-enabled');
                        var clichHandler = function (e) {
                            var coord = e.latlng;
                            var lat = coord.lat;
                            var lng = coord.lng;
                            var text = "change: ".concat(uezd, ";\n`").concat(npTitle, "`;\n`").concat(lat, ", ").concat(lng, "`\n[ordaOfBy](https://orda.of.by/.map/?").concat(lat, ",").concat(lng, "&m=1v/14,wig/13,wig_v2/14,wig250/14,rkka/14,rkka_v2/14,rkka250/14,rkka2km/12,3v/13,3v_tmp56/13,3v_tmp71/13,kdwr/13,nem25/14,2v/13,polv/13,austr/13)");
                            if (telegramBotToken && telegramChatId) {
                                var parse_mode = 'Markdown';
                                var disable_web_page_preview = true;
                                fetch("https://api.telegram.org/bot".concat('telegramBotToken', "/sendMessage?chat_id=").concat('telegramChatId', "&parse_mode=").concat(parse_mode, "&disable_web_page_preview=").concat(disable_web_page_preview, "&text=").concat(encodeURIComponent(text))).then(function () {
                                    leaflet_1.default.DomUtil.removeClass(mapElement, 'crosshair-cursor-enabled');
                                    map.off('click', clichHandler);
                                    alert("Координаты отправлены!");
                                });
                            }
                            else {
                                console.log(text);
                                leaflet_1.default.DomUtil.removeClass(mapElement, 'crosshair-cursor-enabled');
                                map.off('click', clichHandler);
                                alert("Координаты отправлены!");
                            }
                        };
                        setTimeout(function () {
                            map.on('click', clichHandler);
                            map.closePopup();
                        });
                    }, title: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C \u0433\u0435\u043E\u043B\u043E\u043A\u0430\u0446\u0438\u044E" }, "\u0441\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B"))));
};
exports["default"] = PlaceMarker;


/***/ }),

/***/ 7073:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_leaflet_1 = __webpack_require__(2745);
var react_1 = __importDefault(__webpack_require__(6540));
var SetMapSizeOnChange = function (_a) {
    var top = _a.top, height = _a.height;
    var map = (0, react_leaflet_1.useMap)();
    react_1.default.useEffect(function () {
        if (map != null) {
            map.invalidateSize();
        }
    }, [map, top, height]);
    var mapContainer = map.getContainer();
    mapContainer.style.cssText = "top: ".concat(top, ";height: ").concat(height, ";position: relative;");
    return react_1.default.createElement("div", null);
};
exports["default"] = SetMapSizeOnChange;


/***/ }),

/***/ 6397:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableResults = void 0;
var react_1 = __importDefault(__webpack_require__(6540));
var TableResults = function (_a) {
    var hits = _a.hits;
    return react_1.default.createElement("table", { className: "table table-striped" },
        react_1.default.createElement("thead", { className: "desktop-version" },
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "\u0442\u0438\u043F"),
                react_1.default.createElement("td", null, "\u043D.\u043F."),
                react_1.default.createElement("td", null, "\u0412\u043E\u043B\u043E\u0441\u0442\u044C"),
                react_1.default.createElement("td", null, "\u0423\u0435\u0437\u0434"),
                react_1.default.createElement("td", null, "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446"),
                react_1.default.createElement("td", null, "\u0426\u0435\u0440\u043A\u043E\u0432\u044C"))),
        react_1.default.createElement("tbody", null, hits.map(function (_a, index) {
            var _b, _c, _d, _e;
            var _highlightResult = _a._highlightResult, npTitle = _a.npTitle, ownerTitle = _a.ownerTitle, uezd = _a.uezd, volost = _a.volost, npType = _a.npType, prikhodTitle = _a.prikhodTitle, _geoloc = _a._geoloc;
            var copyCoodrs = function () {
                var line = "".concat(npTitle, ";").concat(npType, ";;").concat(volost, ";").concat(uezd);
                if (_geoloc && _geoloc.lat && _geoloc.lng) {
                    var _a = _geoloc || {}, lat = _a.lat, lng = _a.lng;
                    var coords = "".concat(line, "\t").concat(lat, ", ").concat(lng);
                    try {
                        navigator.clipboard.writeText(coords);
                    }
                    catch (err) {
                        console.error('Failed to copy: ', err);
                    }
                }
            };
            return react_1.default.createElement("tr", { key: index },
                react_1.default.createElement("td", null,
                    react_1.default.createElement("span", null, npType ? "".concat(npType, " ") : ''),
                    react_1.default.createElement("span", { className: "mobile-version", dangerouslySetInnerHTML: { __html: ((_b = _highlightResult === null || _highlightResult === void 0 ? void 0 : _highlightResult.npTitle) === null || _b === void 0 ? void 0 : _b.value) || npTitle } })),
                react_1.default.createElement("td", { className: "desktop-version" },
                    react_1.default.createElement("span", { onClick: copyCoodrs, dangerouslySetInnerHTML: { __html: ((_c = _highlightResult === null || _highlightResult === void 0 ? void 0 : _highlightResult.npTitle) === null || _c === void 0 ? void 0 : _c.value) || npTitle } }),
                    react_1.default.createElement("span", { className: "copy-icon", title: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u044D\u0433 \u0438 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B", onClick: copyCoodrs },
                        react_1.default.createElement("svg", { version: "1.1", id: "Layer_1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", height: "10px", width: "10px", viewBox: "0 0 115.77 122.88" },
                            react_1.default.createElement("g", null,
                                react_1.default.createElement("path", { className: "st0", d: "M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" }))))),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("span", null, volost),
                    react_1.default.createElement("span", { className: "mobile-version" }, " \u0432\u043E\u043B. "),
                    react_1.default.createElement("span", { className: "mobile-version" }, uezd),
                    react_1.default.createElement("span", { className: "mobile-version" }, " \u0443.")),
                react_1.default.createElement("td", { className: "desktop-version" }, uezd),
                react_1.default.createElement("td", { className: "mobile-version" },
                    react_1.default.createElement("i", { className: "mobile-version" }, "\u041F\u0440\u0438\u043D\u0430\u0434.: "),
                    react_1.default.createElement("span", { className: "mobile-version", dangerouslySetInnerHTML: { __html: ((_d = _highlightResult === null || _highlightResult === void 0 ? void 0 : _highlightResult.ownerTitle) === null || _d === void 0 ? void 0 : _d.value) || ownerTitle } })),
                react_1.default.createElement("td", { className: "desktop-version", dangerouslySetInnerHTML: { __html: ((_e = _highlightResult === null || _highlightResult === void 0 ? void 0 : _highlightResult.ownerTitle) === null || _e === void 0 ? void 0 : _e.value) || ownerTitle } }),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("i", { className: "mobile-version" }, "\u0446\u0435\u0440/\u043A\u043E\u0441\u0442: "),
                    react_1.default.createElement("span", null, prikhodTitle)));
        })));
};
exports.TableResults = TableResults;


/***/ }),

/***/ 3115:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttle = throttle;
function throttle(func, ms) {
    var isThrottled = false;
    var savedArgs;
    var savedThis;
    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments); // (1)
        isThrottled = true;
        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}


/***/ }),

/***/ 9174:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __importDefault(__webpack_require__(6540));
var useMarkersBounds = function (mapHits) {
    var _a = react_1.default.useState(), currentBounds = _a[0], setCurrentBounds = _a[1];
    react_1.default.useEffect(function () {
        var maxLat = 0;
        var maxLng = 0;
        var minLat = 0;
        var minLlng = 0;
        mapHits && mapHits.length && __spreadArray([], mapHits, true).forEach(function (item) {
            var _geoloc = item._geoloc;
            if (!_geoloc.lat) {
                return;
            }
            var lat = _geoloc.lat, lng = _geoloc.lng;
            if (lat) {
                if (lat > maxLat || !maxLat) {
                    maxLat = lat;
                }
                if (lat < minLat || !minLat) {
                    minLat = lat;
                }
            }
            if (lng) {
                if (lng > maxLng || !maxLng) {
                    maxLng = lng;
                }
                if (lng < minLlng || !minLlng) {
                    minLlng = lng;
                }
            }
        });
        setCurrentBounds([[maxLat, maxLng], [minLat, minLlng]]);
    }, [mapHits, mapHits.length]);
    return currentBounds;
};
exports["default"] = useMarkersBounds;


/***/ }),

/***/ 877:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useWindowSize = void 0;
var react_1 = __importDefault(__webpack_require__(6540));
var throttle_1 = __webpack_require__(3115);
var useWindowSize = function (ms) {
    if (ms === void 0) { ms = 200; }
    var _a = react_1.default.useState({
        width: undefined,
        height: undefined,
    }), windowSize = _a[0], setWindowSize = _a[1];
    react_1.default.useEffect(function () {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        var throttledHandleResize = (0, throttle_1.throttle)(handleResize, ms);
        window.addEventListener("resize", throttledHandleResize);
        handleResize();
        return function () { return window.removeEventListener("resize", throttledHandleResize); };
    }, []);
    return windowSize;
};
exports.useWindowSize = useWindowSize;


/***/ }),

/***/ 3900:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var client_1 = __importDefault(__webpack_require__(5338));
var react_1 = __importDefault(__webpack_require__(6540));
var App_1 = __importDefault(__webpack_require__(5802));
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(App_1.default, null));


/***/ }),

/***/ 3385:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%272%27 fill=%27%23fff%27/%3e%3c/svg%3e";

/***/ }),

/***/ 5782:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%2386b7fe%27/%3e%3c/svg%3e";

/***/ }),

/***/ 4718:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e";

/***/ }),

/***/ 7154:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e";

/***/ }),

/***/ 8734:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%28255, 255, 255, 0.25%29%27/%3e%3c/svg%3e";

/***/ }),

/***/ 5372:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e";

/***/ }),

/***/ 7249:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z%27/%3e%3c/svg%3e";

/***/ }),

/***/ 6690:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%236ea8fe%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e";

/***/ }),

/***/ 5932:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z%27/%3e%3c/svg%3e";

/***/ }),

/***/ 1144:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e";

/***/ }),

/***/ 7210:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%23052c65%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M2 5L8 11L14 5%27/%3e%3c/svg%3e";

/***/ }),

/***/ 7326:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%23212529%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M2 5L8 11L14 5%27/%3e%3c/svg%3e";

/***/ }),

/***/ 5531:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e";

/***/ }),

/***/ 7115:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23dee2e6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e";

/***/ }),

/***/ 4274:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27M6 10h8%27/%3e%3c/svg%3e";

/***/ }),

/***/ 5419:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e";

/***/ }),

/***/ 6366:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e";

/***/ }),

/***/ 2247:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%2833, 37, 41, 0.75%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e";

/***/ }),

/***/ 8487:
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%23198754%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			524: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkuezdy"] = self["webpackChunkuezdy"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [377], () => (__webpack_require__(3900)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;