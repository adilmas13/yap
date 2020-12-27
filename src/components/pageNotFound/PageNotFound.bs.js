'use strict';

var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var AssetLoader$Yap = require("../../utils/assetLoader.bs.js");

var parent = {
  display: "flex",
  height: "100vh",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

var text = {
  color: "gray",
  fontSize: "50px",
  fontWeight: "600",
  marginTop: "10px"
};

var Style = {
  parent: parent,
  text: text
};

function PageNotFound(Props) {
  return React.createElement("div", {
              style: parent
            }, React.createElement("img", {
                  src: AssetLoader$Yap.dead,
                  width: "300px"
                }), React.createElement("div", {
                  style: text
                }, Ru$Yap.s("404 !! not found")));
}

var make = PageNotFound;

exports.Style = Style;
exports.make = make;
/* react Not a pure module */
