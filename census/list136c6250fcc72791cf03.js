!function(e){function t(t){for(var a,u,c=t[0],o=t[1],f=t[2],i=0,d=[];i<c.length;i++)u=c[i],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&d.push(r[u][0]),r[u]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);for(s&&s(t);d.length;)d.shift()();return l.push.apply(l,f||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],a=!0,c=1;c<n.length;c++){var o=n[c];0!==r[o]&&(a=!1)}a&&(l.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},r={3:0},l=[];function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var s=o;l.push([137,0,5]),n()}({137:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(20)),l=a(n(0));n(138),n(140);var u=function(e){var t=e.summary,n=e.children;return l.default.createElement("details",{className:"list-group-item"},l.default.createElement("summary",null,t),n)},c=document.getElementById("root");r.default.render(l.default.createElement((function(){var e,t,n=l.default.useState({}),a=n[0],r=n[1],c=l.default.useState({}),o=c[0],f=c[1],s=l.default.useState(0),i=s[0],d=s[1];return l.default.useEffect((function(){fetch("./fodPages.json").then((function(e){return e.json()})).then(r),fetch("./noFodPages.json").then((function(e){return e.json()})).then(f)}),[]),l.default.createElement(l.default.Fragment,null,l.default.createElement("ul",{className:"nav nav-underline"},l.default.createElement("li",{className:"nav-item"},l.default.createElement("a",{className:"nav-link ".concat(0===i?"active":""),onClick:function(){return d(0)},href:"#"},"С шифрами")),l.default.createElement("li",{className:"nav-item"},l.default.createElement("a",{className:"nav-link ".concat(1===i?"active":""),onClick:function(){return d(1)},href:"#"},"Без шифров"))),0===i?l.default.createElement("div",{className:"card"},l.default.createElement("div",{className:"list-group list-group-flush"},null===(e=Object.keys(a))||void 0===e?void 0:e.map((function(e){return l.default.createElement(u,{summary:"Дело № ".concat(e,", ").concat(a[e].rajon," район")},l.default.createElement("div",{className:"card"},l.default.createElement("div",{className:"card-body"},Object.keys(a[e].pages).sort().map((function(t,n){var r="";for(var u in a[e].pages[t])r+="".concat(u,": ").concat(a[e].pages[t][u],"\n");return l.default.createElement(l.default.Fragment,null,n?l.default.createElement("span",null,", "):"",l.default.createElement("span",{className:"page-nmb",title:r},t))})))))})))):"",1===i?l.default.createElement("div",{className:"card"},l.default.createElement("div",{className:"list-group list-group-flush"},null===(t=Object.keys(o))||void 0===t?void 0:t.sort().map((function(e){var t=o[e];return l.default.createElement(u,{summary:"".concat(e,", ").concat(t.title)},l.default.createElement("div",{className:"card"},l.default.createElement("div",{className:"card-body"},l.default.createElement("div",null,"Всего записей: ",t.count),t.fod?l.default.createElement("div",null,"Фонд: ",t.fod):"",Object.keys(t.pages).map((function(e){return e?l.default.createElement("div",null,e,": ",t.pages[e]," записей"):""})))))})))):"")}),null),c)}});