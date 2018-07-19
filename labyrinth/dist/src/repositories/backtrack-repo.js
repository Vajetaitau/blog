"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_backtrack_status_1 = require("../models/point-backtrack-status");
var query_builder_1 = require("./query/query-builder");
var BacktrackRepo = /** @class */ (function () {
    function BacktrackRepo() {
        this._sizeConstant = 1000;
    }
    BacktrackRepo.prototype.getBacktrackStatus = function (point) {
        return new query_builder_1.default()
            .query("select north, south, east, west " +
            "from backtrack_info as bi " +
            "where bi.x = $1 " +
            "and bi.y = $2", [point.x, point.y])
            .then(function (res) {
            var firstRow = res.rows[0];
            return new point_backtrack_status_1.default(firstRow.north, firstRow.south, firstRow.east, firstRow.west);
        });
    };
    return BacktrackRepo;
}());
exports.default = new BacktrackRepo();
