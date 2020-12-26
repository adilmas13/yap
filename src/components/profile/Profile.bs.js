'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Ru$Yap = require("../../utils/ru.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var UserDetails$Yap = require("../../data/userDetails.bs.js");
var AvatarCollection$Yap = require("../../data/avatarCollection.bs.js");

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
  position: "relative",
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
  height: "100vh",
  paddingLeft: "20px",
  position: "relative",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center"
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
  height: "95px",
  marginLeft: "10px",
  position: "relative",
  opacity: "0",
  flexDirection: "column",
  justifyContent: "center",
  transition: "0.3s ease-out all",
  transitionDelay: "0.5s"
};

var input = {
  background: "transparent",
  border: "none",
  color: "black",
  fontSize: "4rem",
  outline: "none",
  opacity: "0.70"
};

var line = {
  background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
  bottom: "4px",
  height: "4px",
  position: "absolute",
  width: "0",
  borderRadius: "5px",
  transition: "0.3s ease-out all",
  transitionDelay: "0.5s"
};

var enterBtn = {
  background: "linear-gradient(0deg, #00d2ff, #3a7bd5)",
  bottom: "20px",
  cursor: "pointer",
  height: "70px",
  padding: "20px",
  position: "absolute",
  right: "20px",
  width: "70px",
  opacity: "0",
  borderRadius: "50%",
  transition: "0.2s ease-out all",
  transform: "scale(0)",
  pointerEvents: "none"
};

var enterBtnActive = {
  opacity: "1",
  transform: "scale(1) rotate(180deg)",
  pointerEvents: "all"
};

var avatarParent = {
  display: "flex",
  flexDirection: "column"
};

var avatarTitle = {
  fontSize: "4rem"
};

var avatarList = {
  display: "grid",
  paddingLeft: "50px",
  justifyContent: "flex-start",
  gridGap: "20px",
  gridTemplateColumns: "auto auto auto auto auto"
};

var avatarItem = {
  border: "2px solid transparent",
  cursor: "pointer",
  display: "flex",
  height: "100px",
  width: "100px",
  borderRadius: "10px",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s ease-out all"
};

var avatarSelected = {
  border: "2px solid #3a7bd5"
};

var avatarImg = {
  width: "70px"
};

var avatarWrapperActive = {
  opacity: "1"
};

var avatarWrapper = {
  opacity: "0",
  transition: "0.3s ease-out all"
};

var logoWrapper = {
  display: "flex",
  left: "20px",
  position: "absolute",
  top: "20px",
  justifyContent: "center"
};

var logoText = {
  color: "#fff",
  fontSize: "25px",
  fontWeight: "600",
  marginLeft: "10px"
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
  line: line,
  enterBtn: enterBtn,
  enterBtnActive: enterBtnActive,
  avatarParent: avatarParent,
  avatarTitle: avatarTitle,
  avatarList: avatarList,
  avatarItem: avatarItem,
  avatarSelected: avatarSelected,
  avatarImg: avatarImg,
  avatarWrapperActive: avatarWrapperActive,
  avatarWrapper: avatarWrapper,
  logoWrapper: logoWrapper,
  logoText: logoText
};

function Profile$LeftSection(Props) {
  return React.createElement("div", {
              style: leftParent
            }, React.createElement("div", {
                  style: description
                }, Ru$Yap.s("let's talk")), React.createElement("div", {
                  style: logoWrapper
                }, React.createElement("img", {
                      src: "../../assets/logo.svg",
                      width: "50px"
                    }), React.createElement("div", {
                      style: logoText
                    }, Ru$Yap.s("yap !!"))));
}

var LeftSection = {
  make: Profile$LeftSection
};

function Profile$AvatarItem(Props) {
  var avatar = Props.avatar;
  var isSelected = Props.isSelected;
  var onSelected = Props.onSelected;
  var avatarStyle = isSelected ? Object.assign({}, avatarItem, avatarSelected) : avatarItem;
  return React.createElement("div", {
              style: avatarStyle,
              onClick: (function (param) {
                  return Curry._1(onSelected, undefined);
                })
            }, React.createElement("img", {
                  style: avatarImg,
                  src: avatar
                }));
}

var AvatarItem = {
  make: Profile$AvatarItem
};

function Profile$Avatar(Props) {
  var selectAvatar = Props.selectAvatar;
  var selectedAvatar = Props.selectedAvatar;
  return React.createElement("div", {
              style: avatarParent
            }, React.createElement("div", {
                  style: avatarTitle
                }, Ru$Yap.s("> select an avatar")), React.createElement("div", {
                  style: avatarList
                }, Ru$Yap.mapi(AvatarCollection$Yap.avatars, (function (index, avatar) {
                        return React.createElement(Profile$AvatarItem, {
                                    avatar: avatar,
                                    isSelected: selectedAvatar === index,
                                    onSelected: (function (param) {
                                        return Curry._1(selectAvatar, (function (param) {
                                                      return index;
                                                    }));
                                      }),
                                    key: String(index)
                                  });
                      }))));
}

var Avatar = {
  make: Profile$Avatar
};

function Profile$RightSection(Props) {
  var match = React.useState(function () {
        return "";
      });
  var setTitle = match[1];
  var match$1 = React.useState(function () {
        return "";
      });
  var setName = match$1[1];
  var name = match$1[0];
  var match$2 = React.useState(function () {
        return -1;
      });
  var selectedAvatar = match$2[0];
  var match$3 = React.useState(function () {
        return false;
      });
  var setInputVisible = match$3[1];
  var isInputVisible = match$3[0];
  React.useEffect((function () {
          var text = "> my name is";
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
  var match$4 = name.length;
  var match$5 = selectedAvatar > -1;
  var enterBtnStyle = match$4 !== 0 && match$5 ? Object.assign({}, enterBtn, enterBtnActive) : enterBtn;
  var onChange = function (e) {
    e.stopPropagation();
    var target = e.target;
    var value = target.value.trim();
    return Curry._1(setName, (function (param) {
                  return value;
                }));
  };
  var onClick = function (e) {
    e.stopPropagation();
    UserDetails$Yap.saveUsername(name);
    return UserDetails$Yap.saveAvatar(AvatarCollection$Yap.avatars[selectedAvatar]);
  };
  var avatarLayoutStyle = name.length > 0 ? Object.assign({}, avatarWrapper, avatarWrapperActive) : avatarWrapper;
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
                          placeholder: "john doe",
                          type: "text",
                          onChange: onChange
                        }), React.createElement("div", {
                          style: lineStyle
                        }))), React.createElement("div", {
                  style: avatarLayoutStyle
                }, React.createElement(Profile$Avatar, {
                      selectAvatar: match$2[1],
                      selectedAvatar: selectedAvatar
                    })), React.createElement("div", {
                  style: enterBtnStyle,
                  onClick: onClick
                }, React.createElement("img", {
                      src: "../../assets/arrow.svg"
                    })));
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
exports.AvatarItem = AvatarItem;
exports.Avatar = Avatar;
exports.RightSection = RightSection;
exports.make = make;
/* react Not a pure module */
