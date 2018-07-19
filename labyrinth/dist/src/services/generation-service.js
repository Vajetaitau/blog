"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_1 = require("../enums/direction");
var backtrack_status_1 = require("../enums/backtrack-status");
var GenerationService = /** @class */ (function () {
    function GenerationService() {
    }
    GenerationService.prototype.getAvailableOptions = function (currentPoint) {
        var options = [];
        if (currentPoint.backtrackNorth === backtrack_status_1.default.NOT_VISITED_CHILD) {
            options.push(direction_1.default.NORTH);
        }
        if (currentPoint.backtrackSouth === backtrack_status_1.default.NOT_VISITED_CHILD) {
            options.push(direction_1.default.SOUTH);
        }
        if (currentPoint.backtrackEast === backtrack_status_1.default.NOT_VISITED_CHILD) {
            options.push(direction_1.default.EAST);
        }
        if (currentPoint.backtrackWest === backtrack_status_1.default.NOT_VISITED_CHILD) {
            options.push(direction_1.default.WEST);
        }
        return options;
    };
    return GenerationService;
}());
exports.generationService = new GenerationService();
