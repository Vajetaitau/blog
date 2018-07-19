"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chai = require("chai");
var path_1 = require("../../src/models/path");
var point_1 = require("../../src/models/point");
var backtracking_service_1 = require("../../src/services/backtracking-service");
var direction_1 = require("../../src/enums/direction");
var direction_status_1 = require("../../src/enums/direction-status");
describe("BacktrackingService", function () {
    describe("#getLastOpenPoint", function () {
        it("Should return the last point of the path", function () {
            var path = new path_1.default([
                new point_1.default(0, 0),
                new point_1.default(0, 1),
                new point_1.default(0, 2),
                new point_1.default(1, 2),
                new point_1.default(2, 2),
            ]);
            var lastOpenPoint = backtracking_service_1.backtrackingService.getLastOpenPoint(path);
            Chai.assert.deepEqual(lastOpenPoint, new point_1.default(2, 2));
        });
        it("Should return the second last", function () {
            var path = new path_1.default([
                new point_1.default(0, 0),
                new point_1.default(0, 1),
                new point_1.default(0, 2),
                new point_1.default(1, 2),
                new point_1.default(2, 2),
                new point_1.default(2, 1),
                new point_1.default(2, 0),
                new point_1.default(1, 0),
                new point_1.default(1, 1)
            ]);
            var lastOpenPoint = backtracking_service_1.backtrackingService.getLastOpenPoint(path);
            Chai.assert.deepEqual(lastOpenPoint, new point_1.default(1, 0));
        });
    });
    describe("#getUnexploredOptions", function () {
        it("(0, 0) only east is open", function () {
            var point = new point_1.default(0, 0, direction_status_1.default.CLOSED, direction_status_1.default.CLOSED, direction_status_1.default.OPEN, direction_status_1.default.CLOSED);
            return backtracking_service_1.backtrackingService.getUnexploredOptions(point).then(function (unexploredOptions) {
                Chai.assert.deepStrictEqual(unexploredOptions, [direction_1.default.EAST]);
            });
        });
        it("(1, 0) only north is open", function () {
            var point = new point_1.default(1, 0, direction_status_1.default.OPEN, direction_status_1.default.CLOSED, direction_status_1.default.CLOSED, direction_status_1.default.CLOSED);
            return backtracking_service_1.backtrackingService.getUnexploredOptions(point).then(function (unexploredOptions) {
                Chai.assert.deepStrictEqual(unexploredOptions, [direction_1.default.NORTH]);
            });
        });
    });
});
