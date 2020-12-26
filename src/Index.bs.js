'use strict';

var React = require("react");
var App$Yap = require("./App.bs.js");
var ReactDOMRe = require("reason-react/src/legacy/ReactDOMRe.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(App$Yap.make, {}), "app");

/*  Not a pure module */
