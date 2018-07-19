"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var backtrack_status_1 = require("../enums/backtrack-status");
var direction_1 = require("../enums/direction");
var direction_status_1 = require("../enums/direction-status");
var move_options_service_1 = require("./move-options-service");
var backtrack_repo_1 = require("../repositories/backtrack-repo");
var BacktrackingService = /** @class */ (function () {
    function BacktrackingService() {
    }
    BacktrackingService.prototype.backtrackToParent = function (point) {
        return point;
    };
    BacktrackingService.prototype.getLastOpenPoint = function (path) {
        var lastOpenPoint = _.findLast(path.pointArray, function (point) {
            return move_options_service_1.moveOptionsService.availableOptions(path, point).length > 0;
        });
        if (lastOpenPoint !== undefined) {
            return lastOpenPoint;
        }
        else {
            throw new Error("The whole path is taken!");
        }
    };
    BacktrackingService.prototype.getUnexploredOptions = function (point) {
        return backtrack_repo_1.default.getBacktrackStatus(point).then(function (pointBacktrackStatus) {
            var unexploredOptions = new Array();
            direction_1.default.values().forEach(function (direction) {
                if (point.statusInDirection(direction) === direction_status_1.default.OPEN &&
                    pointBacktrackStatus.statusInDirection(direction) === backtrack_status_1.default.NOT_VISITED_CHILD) {
                    unexploredOptions.push(direction);
                }
            });
            return unexploredOptions;
        });
    };
    return BacktrackingService;
}());
exports.backtrackingService = new BacktrackingService();
