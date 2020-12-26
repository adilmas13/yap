'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../utils/ru.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

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

var rightParent = {
  display: "flex",
  paddingLeft: "20px",
  alignItems: "center"
};

var text1 = {
  fontSize: "70px"
};

var Style = {
  parent: parent,
  leftParent: leftParent,
  description: description,
  rightParent: rightParent,
  text1: text1
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

function Profile$RightSection(Props) {
  var match = React.useState(function () {
        return "";
      });
  var setTitle = match[1];
  React.useEffect((function () {
          Belt_Array.forEachWithIndex("my name is".split(""), (function (index, $$char) {
                  setTimeout((function (param) {
                          return Curry._1(setTitle, (function (current) {
                                        return current.concat($$char);
                                      }));
                        }), Math.imul(index + 1 | 0, 70));
                  
                }));
          
        }), []);
  return React.createElement("div", {
              style: rightParent
            }, React.createElement("div", {
                  style: text1
                }, Ru$Yap.s(match[0])));
}

var RightSection = {
  make: Profile$RightSection
};

function Profile(Props) {
  return React.createElement("div", {
              style: parent
            }, React.createElement(Profile$LeftSection, {}), React.createElement(Profile$RightSection, {}));
}

var make = Profile;

exports.Style = Style;
exports.LeftSection = LeftSection;
exports.RightSection = RightSection;
exports.make = make;
/* react Not a pure module */
