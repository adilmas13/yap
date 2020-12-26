'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../utils/ru.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var parent = {
  display: "flex",
  height: "100vh",
  padding: "0 10px",
  alignItems: "center"
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
  fontSize: "4rem",
  transition: "0.3s ease-out all"
};

var centerWrapper = {
  display: "flex"
};

var inputWrapper = {
  display: "flex",
  marginLeft: "10px",
  opacity: "0",
  flexDirection: "column",
  transition: "0.3s ease-out all",
  transitionDelay: "0.5s"
};

var input = {
  background: "transparent",
  border: "none",
  fontSize: "4rem",
  outline: "none"
};

var line = {
  backgroundColor: "black",
  height: "4px",
  width: "0",
  transition: "0.3s ease-out all",
  transitionDelay: "0.5s"
};

var Style = {
  parent: parent,
  leftParent: leftParent,
  description: description,
  rightParent: rightParent,
  text1: text1,
  centerWrapper: centerWrapper,
  inputWrapper: inputWrapper,
  input: input,
  line: line
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
  var match$1 = React.useState(function () {
        return false;
      });
  var setInputVisible = match$1[1];
  var isInputVisible = match$1[0];
  React.useEffect((function () {
          var text = "my name is";
          Belt_Array.forEachWithIndex(text.split(""), (function (index, $$char) {
                  setTimeout((function (param) {
                          Curry._1(setTitle, (function (current) {
                                  return current.concat($$char);
                                }));
                          if (index === (text.length - 1 | 0)) {
                            return Curry._1(setInputVisible, (function (param) {
                                          return true;
                                        }));
                          }
                          
                        }), Math.imul(index + 1 | 0, 70));
                  
                }));
          
        }), []);
  var inputWrapperStyle = isInputVisible ? Object.assign({}, inputWrapper, {
          opacity: "1"
        }) : inputWrapper;
  var lineStyle = isInputVisible ? Object.assign({}, line, {
          width: "100%"
        }) : line;
  return React.createElement("div", {
              style: rightParent
            }, React.createElement("div", {
                  style: centerWrapper
                }, React.createElement("div", {
                      style: text1
                    }, Ru$Yap.s(match[0])), React.createElement("div", {
                      style: inputWrapperStyle
                    }, React.createElement("input", {
                          style: input,
                          placeholder: "John Doe",
                          type: "text"
                        }), React.createElement("div", {
                          style: lineStyle
                        }))));
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
