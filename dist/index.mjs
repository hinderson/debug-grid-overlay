function t(){var t={};return{on:function(n,e){t[n]||(t[n]={queue:[]}),t[n].queue.push(e)},emit:function(n,e){t[n]&&0!==t[n].queue.length&&t[n].queue.forEach(function(t){return t(e)})}}}var n=function(t,n,e){var o=function(e){return"."+t+" { "+n+": "+e+"; }"};return"object"==typeof e?Object.keys(e).map(function(t){return"&"===t?o(e[t]):"@media screen and ("+t+") { "+o(e[t])+" }"}).join(""):o(e)};export default function(e){void 0===e&&(e={});var o=e.columns;void 0===o&&(o=12);var r=e.gutterWidth;void 0===r&&(r="16px");var i=e.columnWidth;void 0===i&&(i="1fr");var a=e.verticalRhythm;void 0===a&&(a="20px");var d=e.keyCode;void 0===d&&(d=71);var u=new t,c=u.emit,g=u.on,m="g"+Math.random().toString(36).substr(2,9),l="i"+Math.random().toString(36).substr(2,9),p="\n\t\t."+m+" {\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tbottom: 0;\n\t\t\tz-index: 10000;\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t\tpointer-events: none;\n\t\t}\n\n\t\t."+l+" {\n\t\t\tdisplay: grid;\n\t\t\theight: 100%;\n\t\t\tbackground-color: rgba(14, 109, 14, 0.1);\n\t\t\tmargin-left: auto;\n\t\t\tmargin-right: auto;\n\t\t\tbox-sizing: content-box;\n\t\t\tgrid-template-columns: repeat("+o+", "+i+");\n\t\t\tcolumn-gap: "+r+";\n\t\t}\n\n\t\t."+l+'::before {\n\t\t\tcontent: "";\n\t\t\tposition: absolute;\n\t\t\tleft: calc(50% - 1px);\n\t\t\twidth: 1px;\n\t\t\theight: 100%;\n\t\t\tbackground: #bbb;\n\t\t\topacity: 0.6;\n\t\t}\n\n\t\t.'+l+'::after {\n\t\t\tcontent: "";\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tbottom: 0;\n\t\t\topacity: 0.4;\n\t\t\tbackground-image: linear-gradient(to bottom, cyan 0, transparent 1px);\n\t\t\tbackground-repeat: repeat-y;\n\t\t\tbackground-size: 100% '+a+";\n\t\t}\n\n\t\t."+l+" > div {\n\t\t\tmargin-top: 0;\n\t\t\tbackground-color: rgba(255, 192, 203, 0.2);\n\t\t}\n\t";p+=Object.entries(arguments[0]).map(function(t){var e=t[1],o={marginsWidth:function(){return[n(l,"padding-left",e),n(l,"padding-right",e)].join("")},maxWidth:function(){return n(l,"max-width",e)},gutterWidth:function(){return n(l,"column-gap",e)},default:function(){return""}};return(o[t[0]]||o.default)()}).join("");var s=document.createElement("style");s.id="debug-grid-overlay",s.innerHTML=p.replace(/\n/g,"").replace(/\s\s+/g," ");var v,b=(v='\n\t\t<div class="'+m+' debug-grid-overlay">\n\t\t\t<div class="'+l+'">\n\t\t\t\t'+Array.from({length:o},function(){return"<div></div>"}).join("")+"\n\t\t\t</div>\n\t\t</div>\n\t",(new DOMParser).parseFromString(v,"text/html").body.firstChild);function f(){document.body.contains(b)?(document.head.removeChild(s),document.body.removeChild(b),c("toggled",!1)):(document.head.insertAdjacentElement("beforeend",s),document.body.append(b),c("toggled",!0))}return window.addEventListener("keydown",function(t){"INPUT"!==document.activeElement.tagName&&"TEXTAREA"!==document.activeElement.tagName&&event.keyCode===d&&f()}),{toggle:f,on:g}}
//# sourceMappingURL=index.mjs.map
