(()=>{"use strict";var e,t,l,a={3968:function(e,t,l){var a=this&&this.__spreadArray||function(e,t,l){if(l||2===arguments.length)for(var a,r=0,n=t.length;r<n;r++)!a&&r in t||(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.MapApp=void 0;var n=r(l(6540)),o=l(961);l(2508);var c=r(l(4215)),s=r(l(3481)).default.DivIcon,i=l(8567);l(1780);var u=r(l(3311)),f=l(4938)("1SQITOMPJN","2f1a6c924bc9f33235bb98e570053a79"),d=f.initIndex("revisions"),m=f.initIndex(void 0);t.MapApp=function(){var e=n.default.useState(""),t=e[0],l=e[1],r=n.default.useState(!1),f=r[0],p=r[1],v=n.default.useState([]),g=v[0],h=v[1],w=n.default.useState([]),x=w[0],E=w[1],y=n.default.useState(0),b=y[0],k=y[1],_=n.default.useState({}),j=_[0],M=_[1],O=n.default.useState({}),B=O[0],z=O[1],S=n.default.useState(""),P=S[0],N=S[1],L=(0,u.default)(t,1e3);return n.default.useEffect((function(){if(L){var e=[];P&&e.push(["uezd:".concat(P)]),d.search(L,{facets:["*"],typoTolerance:f,facetFilters:e,filters:""}).then((function(e){var t=e.hits,l=e.nbHits,a=e.facets;e.facets_stats,h(t),k(l),z(a)}))}}),[L,f,P]),n.default.useEffect((function(){d.search("",{facets:["*"],typoTolerance:f,facetFilters:[],filters:""}).then((function(e){e.hits,e.nbHits;var t=e.facets;e.facets_stats,M(t)}))}),[]),n.default.useEffect((function(){var e=[];B.uezd&&e.push(a([],Object.keys(B.uezd).map((function(e){return"uezd:".concat(e)})),!0)),m.search("",{facets:["*"],facetFilters:e,filters:""}).then((function(e){var t=e.hits;E(t)}))}),[B.uezd]),n.default.createElement(n.default.Fragment,null,n.default.createElement(i.MapContainer,{attributionControl:!1,id:"map",center:[53.902287,27.561824],zoom:11,trackResize:!0,scrollWheelZoom:!0,zoomControl:!1,style:{height:"98vh"}},n.default.createElement(i.LayerGroup,null,n.default.createElement(i.TileLayer,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",maxZoom:10}),n.default.createElement(i.TileLayer,{url:"https://raw.githubusercontent.com/shappoff/storage/rkka_v4_and_2v_jan20/tiles/Z{z}/{y}/{x}.jpg",minZoom:11,maxZoom:14})),x.map((function(e){return~e._tags.indexOf("geoloc")?n.default.createElement(i.Marker,{title:"".concat(e.type," ").concat(e.title),icon:new s({html:'<svg fill="red" width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n                                    <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"/>\n                                    </svg>',className:"marker-div-icon"}),position:[e._geoloc.lat,e._geoloc.lng]},n.default.createElement(i.Popup,null,e.type," ",e.title)):""})),(0,o.createPortal)(n.default.createElement("div",{id:"filter-bar"},n.default.createElement("input",{id:"input-id",autoFocus:!0,placeholder:"ФИО",onInput:function(e){var t=e.target;return l(t.value)},onChange:function(e){27==e.which&&(l(""),h([]))},type:"text",value:t}),n.default.createElement("div",{className:"form-check form-check-inline form-switch typo-tolerance"},n.default.createElement("input",{className:"form-check-input",type:"checkbox",role:"switch",id:"flexSwitchCheckDefault",checked:!f,onChange:function(e){return p(!e.target.checked)}}),n.default.createElement("label",{className:"form-check-label",htmlFor:"flexSwitchCheckDefault"},"Точный поиск")),n.default.createElement(c.default,{className:"year-filter",options:j.uezd?Object.keys(j.uezd).map((function(e){return{label:e,value:e}})):[],placeholder:"Уезд",onChange:function(e){var t=e.value;return N(t)}}),n.default.createElement(c.default,{className:"year-filter",options:j.owner?Object.keys(j.owner).map((function(e){return{label:e,value:e}})):[],placeholder:"Владелец селения"}),n.default.createElement(c.default,{className:"year-filter",options:j.church?Object.keys(j.church).map((function(e){return{label:e,value:e}})):[],placeholder:"Церковь/Костел"}),n.default.createElement(c.default,{className:"year-filter",options:j.type?Object.keys(j.type).map((function(e){return{label:e,value:e}})):[],placeholder:"Источник"})),document.getElementById("filter-bar")),(0,o.createPortal)(n.default.createElement("div",{className:"result-list"},b?n.default.createElement("table",{className:"table table-striped"},n.default.createElement("thead",{className:"desktop-version"},n.default.createElement("tr",null,n.default.createElement("th",null,"fPrev"),n.default.createElement("th",null,"fCur"),n.default.createElement("th",null,"Год"),n.default.createElement("th",null,"Глава семьи"),n.default.createElement("th",null,"н.п."),n.default.createElement("th",null,"Уезд"),n.default.createElement("th",null,"Источник"))),n.default.createElement("tbody",{id:"list-of-res"},g.map((function(e,t){return n.default.createElement("tr",{key:t},n.default.createElement("td",null,e.fPrev),n.default.createElement("td",null,e.fCur),n.default.createElement("td",null,e.year),n.default.createElement("td",null,n.default.createElement("details",null,n.default.createElement("summary",null,e.headFamily),n.default.createElement("table",{className:"table table-striped"},n.default.createElement("thead",{className:"desktop-version"},n.default.createElement("tr",null,n.default.createElement("th",null,"м"),n.default.createElement("th",null,"ж"),n.default.createElement("th",null,"Родство"),n.default.createElement("th",null,"ФИО"),n.default.createElement("th",null,"Возраст в пред. РС."),n.default.createElement("th",null,"Возраст в ",e.year),n.default.createElement("th",null,"Заметки"))),n.default.createElement("tbody",{id:"list-of-res"},e.people.map((function(e){return n.default.createElement("tr",null,n.default.createElement("td",null,e.m),n.default.createElement("td",null,e.f),n.default.createElement("td",null,e.rel),n.default.createElement("td",null,e.fio),n.default.createElement("td",null,e.aPrev?e.aPrev:""),n.default.createElement("td",null,e.aCur?e.aCur:""),n.default.createElement("td",null,e.note))})))))),n.default.createElement("td",{title:e.owner||e.church},e.place),n.default.createElement("td",null,e.uezd),n.default.createElement("td",{title:e.fod},e.type))})))):null),document.getElementById("result-list"))))}},3311:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var l=(0,a.useState)(e),r=l[0],n=l[1];return(0,a.useEffect)((function(){var l=setTimeout((function(){n(e)}),t);return function(){clearTimeout(l)}}),[e]),r};var a=l(6540)},5722:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=a(l(5338)),n=a(l(6540)),o=l(3968);r.default.createRoot(document.getElementById("root")).render(n.default.createElement(o.MapApp,null))},3385:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%272%27 fill=%27%23fff%27/%3e%3c/svg%3e"},5782:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%2386b7fe%27/%3e%3c/svg%3e"},4718:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e"},7154:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e"},8734:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%28255, 255, 255, 0.25%29%27/%3e%3c/svg%3e"},5372:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e"},7249:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z%27/%3e%3c/svg%3e"},6690:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%236ea8fe%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},5932:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z%27/%3e%3c/svg%3e"},1144:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},7210:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%23052c65%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M2 5L8 11L14 5%27/%3e%3c/svg%3e"},7326:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%23212529%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M2 5L8 11L14 5%27/%3e%3c/svg%3e"},5531:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},7115:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23dee2e6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},4274:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27M6 10h8%27/%3e%3c/svg%3e"},5419:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e"},6366:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},2247:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%2833, 37, 41, 0.75%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},8487:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%23198754%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e"}},r={};function n(e){var t=r[e];if(void 0!==t)return t.exports;var l=r[e]={id:e,exports:{}};return a[e].call(l.exports,l,l.exports,n),l.exports}n.m=a,e=[],n.O=(t,l,a,r)=>{if(!l){var o=1/0;for(u=0;u<e.length;u++){for(var[l,a,r]=e[u],c=!0,s=0;s<l.length;s++)(!1&r||o>=r)&&Object.keys(n.O).every((e=>n.O[e](l[s])))?l.splice(s--,1):(c=!1,r<o&&(o=r));if(c){e.splice(u--,1);var i=a();void 0!==i&&(t=i)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[l,a,r]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},l=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,n.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var r=Object.create(null);n.r(r);var o={};t=t||[null,l({}),l([]),l(l)];for(var c=2&a&&e;"object"==typeof c&&!~t.indexOf(c);c=l(c))Object.getOwnPropertyNames(c).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,n.d(r,o),r},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var l=t.getElementsByTagName("script");if(l.length)for(var a=l.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=l[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{n.b=document.baseURI||self.location.href;var e={163:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,r,[o,c,s]=l,i=0;if(o.some((t=>0!==e[t]))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(s)var u=s(n)}for(t&&t(l);i<o.length;i++)r=o[i],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},l=self.webpackChunkmap=self.webpackChunkmap||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})(),n.nc=void 0;var o=n.O(void 0,[885],(()=>n(5722)));o=n.O(o)})();