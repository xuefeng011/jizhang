webpackJsonp([4],{800:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=n(1),l=o(f),a=function(e){function t(e){return r(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return c(t,e),i(t,[{key:"componentDidMount",value:function(){console.log("detail/component/index.js")}},{key:"render",value:function(){return l.default.createElement("div",null,l.default.createElement("h1",null,"detail/component.js"))}}]),t}(f.Component);a.propTypes={UserInfo:f.PropTypes.object.isRequired},t.default=a},801:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(284),u=n(800),c=o(u),i=function(){return{}},f=function(e){return{UserInfo:e.UserInfo}},l=(0,r.connect)(f,i)(c.default);t.default=l}});