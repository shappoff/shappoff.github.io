(()=>{"use strict";var e,t={577:function(e,t,l){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(l(540));t.default=function(){var e=a.default.useState(""),t=e[0],l=e[1],n=a.default.useState("m"),r=n[0],u=n[1],c=a.default.useState([]),f=c[0],d=c[1],o=a.default.useState([]),m=o[0],i=o[1];return a.default.useEffect((function(){fetch("./names.json").then((function(e){return e.json()})).then((function(e){i(e)}))}),[]),a.default.useEffect((function(){t.length?d(m.filter((function(e){var l=e.key,n=e.sex,a=new RegExp(t,"g");return l.match(a)&&r===n}))):d([])}),[t,r]),a.default.createElement(a.default.Fragment,null,a.default.createElement("ul",{className:"nav nav-tabs"},a.default.createElement("li",{className:"nav-item"},a.default.createElement("a",{className:"m"===r?"nav-link active":"nav-link",onClick:function(){u("m")},"aria-current":"page",href:"#"},"Мужские")),a.default.createElement("li",{className:"nav-item"},a.default.createElement("a",{className:"f"===r?"nav-link active":"nav-link",onClick:function(){u("f")},"aria-current":"page",href:"#"},"Женские"))),a.default.createElement("input",{autoFocus:!0,onChange:function(e){var t=e.target;return l(t.value)},type:"text",value:t,id:"input"}),f.length?a.default.createElement("div",null,a.default.createElement("table",{className:"table"},a.default.createElement("thead",null,a.default.createElement("tr",null,a.default.createElement("th",null,"Въ передачѣ на русскій языкъ"),a.default.createElement("th",null,"Въ польскомъ произношеніи."),a.default.createElement("th",null,"Источник"))),a.default.createElement("tbody",null,f.map((function(e,t){var l=e.pl,n=e.ru,r=(e.sex,e.src),u=void 0===r?[]:r;return a.default.createElement("tr",{key:t},a.default.createElement("td",null,n),a.default.createElement("td",null,l),a.default.createElement("td",null,u.map((function(e){return a.default.createElement("span",{title:"ort"===e?"в Правосвии":"в Католичестве"},"ort"===e?a.default.createElement("svg",{height:"15px",width:"15px",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a.default.createElement("polygon",{points:"424.459,186.249 424.459,122.217 288.016,122.217 288.016,82.157 350.504,82.157\n                350.504,40.059 288.016,40.059 288.016,0 223.984,0 223.984,40.059 161.496,40.059 161.496,82.157 223.984,82.157 223.984,122.217\n                87.541,122.217 87.541,186.249 223.984,186.249 223.984,389.783 161.496,389.783 161.496,431.881 223.984,431.881 223.984,512\n                288.016,512 288.016,431.881 350.504,431.881 350.504,389.783 288.016,389.783 288.016,186.249 "})):a.default.createElement("svg",{version:"1.0",xmlns:"http://www.w3.org/2000/svg",width:"15px",height:"15px",viewBox:"0 0 946.000000 1280.000000"},a.default.createElement("g",{transform:"translate(0.000000,1280.000000) scale(0.100000,-0.100000)",fill:"#000000",stroke:"none"},a.default.createElement("path",{d:"M3600 11332 c0 -888 -7 -1353 -20 -1332 -4 7 -10 -2 -14 -21 -8 -41\n-56 -119 -98 -160 -37 -35 -115 -75 -166 -85 -24 -5 -30 -9 -20 -15 7 -5 -397\n-9 -913 -9 -509 0 -1122 -3 -1362 -7 l-437 -6 0 -1122 0 -1122 218 -6 c119 -4\n737 -8 1372 -9 635 -1 1130 -4 1100 -7 l-55 -6 55 -7 c78 -9 165 -52 220 -108\n47 -48 90 -123 90 -157 0 -13 2 -15 9 -5 17 28 21 -566 21 -3511 l0 -3057\n1118 2 1117 3 5 3265 c3 1796 7 3227 9 3180 l4 -85 7 65 c19 152 49 227 120\n300 55 56 142 99 220 108 l55 7 -55 6 c-30 3 467 6 1105 7 638 1 1251 5 1363\n9 l202 6 0 1122 0 1122 -422 6 c-232 4 -840 7 -1352 7 -519 0 -925 4 -918 9\n10 6 4 10 -20 15 -98 19 -193 93 -241 188 -27 54 -56 169 -59 236 -1 20 -4 3\n-8 -38 -4 -41 -7 414 -8 1013 l-2 1087 -1120 0 -1120 0 0 -888z"}))))}))))}))))):a.default.createElement("div",null,a.default.createElement("p",null,"Если буква(буквы) в имени неразборчива, то просто вводите точку(точки) вместо ее",a.default.createElement("br",null),a.default.createElement("code",null,"Никол.й"),a.default.createElement("br",null),a.default.createElement("code",null,"Вла.им.р"),a.default.createElement("br",null),a.default.createElement("br",null),"Если точно известна первая буква - так и вводите ее большой",a.default.createElement("br",null),a.default.createElement("br",null),"Если известно, что имя заканчивается на ",a.default.createElement("b",null,"иний"),", то на конце нужно поставить знак доллара ",a.default.createElement("code",null,"$"),a.default.createElement("br",null),a.default.createElement("code",null,"иний$"),a.default.createElement("br",null),a.default.createElement("br",null),"Если неизвестна первая буква, то начинайте c сивола ",a.default.createElement("code",null,"^")," и точки",a.default.createElement("br",null),a.default.createElement("code",null,"^.имитрий"),a.default.createElement("br",null))))}},900:function(e,t,l){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(l(961)),r=n(l(540)),u=n(l(577));new FontFace("Monomakh Unicode","url(./MonomakhUnicode.otf)").load().then((function(e){document.fonts.add(e),console.log("Font loaded")}));var c=document.getElementById("root");a.default.render(r.default.createElement(u.default,null),c)}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var r=l[e]={exports:{}};return t[e].call(r.exports,r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,l,a,r)=>{if(!l){var u=1/0;for(o=0;o<e.length;o++){for(var[l,a,r]=e[o],c=!0,f=0;f<l.length;f++)(!1&r||u>=r)&&Object.keys(n.O).every((e=>n.O[e](l[f])))?l.splice(f--,1):(c=!1,r<u&&(u=r));if(c){e.splice(o--,1);var d=a();void 0!==d&&(t=d)}}return t}r=r||0;for(var o=e.length;o>0&&e[o-1][2]>r;o--)e[o]=e[o-1];e[o]=[l,a,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={524:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,r,[u,c,f]=l,d=0;if(u.some((t=>0!==e[t]))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(f)var o=f(n)}for(t&&t(l);d<u.length;d++)r=u[d],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(o)},l=self.webpackChunknames=self.webpackChunknames||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=n.O(void 0,[961],(()=>n(900)));a=n.O(a)})();