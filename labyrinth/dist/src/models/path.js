"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Path = /** @class */ (function () {
    function Path(path) {
        var self = this;
        self._path = [];
        if (arguments.length > 1) { // point1, point2, ...
            _.forEach(arguments, function (point) {
                self._path.push(point);
            });
        }
        else { // array
            if (path) {
                _.forEach(path, function (point) {
                    self._path.push(point);
                });
            }
        }
    }
    Path.prototype.contains = function (point) {
        return !!_.find(this._path, point);
    };
    Path.prototype.add = function (point) {
        this._path.push(point);
    };
    Object.defineProperty(Path.prototype, "pointArray", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Path.prototype, "length", {
        get: function () {
            return this._path.length;
        },
        enumerable: true,
        configurable: true
    });
    return Path;
}());
exports.default = Path;
