"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BacktrackStatus;
(function (BacktrackStatus) {
    BacktrackStatus["PARENT"] = "PARENT";
    BacktrackStatus["VISITED_CHILD"] = "VISITED_CHILD";
    BacktrackStatus["NOT_VISITED_CHILD"] = "NOT_VISITED_CHILD";
    BacktrackStatus["CLOSED"] = "CLOSED";
})(BacktrackStatus || (BacktrackStatus = {}));
exports.default = BacktrackStatus;
