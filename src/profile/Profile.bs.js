'use strict';

var React = require("react");
var Ru$Yap = require("../utils/ru.bs.js");

var parent = {
  display: "flex"
};

var leftParent = {
  background: "linear-gradient(180deg, #00d2ff, #3a7bd5)",
  display: "flex",
  height: "calc(100vh - 20px)",
  width: "30%",
  borderRadius: "50px",
  alignItems: "center",
  justifyContent: "center"
};

var description = {
  color: "white",
  fontSize: "40px",
  fontWeight: "600"
};

var Style = {
  parent: parent,
  leftParent: leftParent,
  description: description
};

function Profile$LeftSection(Props) {
  return React.createElement("div", {
              style: leftParent
            }, React.createElement("div", {
                  style: description
                }, Ru$Yap.s("Let's talk")));
}

var LeftSection = {
  make: Profile$LeftSection
};

function Profile(Props) {
  return React.createElement("div", {
              style: parent
            }, React.createElement(Profile$LeftSection, {}));
}

var make = Profile;

exports.Style = Style;
exports.LeftSection = LeftSection;
exports.make = make;
/* react Not a pure module */
