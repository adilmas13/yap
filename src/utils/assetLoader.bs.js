'use strict';

var DeadSvg = require("../assets/dead.svg").default;
var LogoSvg = require("../assets/logo.svg").default;
var ArrowSvg = require("../assets/arrow.svg").default;
var TalkingSvg = require("../assets/talking.svg").default;
var ConversationSvg = require("../assets/conversation.svg").default;

var logo = LogoSvg;

var arrow = ArrowSvg;

var dead = DeadSvg;

var groupChat = ConversationSvg;

var startChat = TalkingSvg;

exports.logo = logo;
exports.arrow = arrow;
exports.dead = dead;
exports.groupChat = groupChat;
exports.startChat = startChat;
/* logo Not a pure module */
