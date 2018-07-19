"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointConnectionInfo = /** @class */ (function () {
    function PointConnectionInfo(from, to, moveCount, shortestPath) {
        this._from = from;
        this._to = to;
        this._moveCount = moveCount;
        this._shortestPath = shortestPath;
    }
    return PointConnectionInfo;
}());
