"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backtrack_repo_1 = require("../../src/repositories/backtrack-repo");
var point_1 = require("../../src/models/point");
var Chai = require("chai");
var point_backtrack_status_1 = require("../../src/models/point-backtrack-status");
var backtrack_status_1 = require("../../src/enums/backtrack-status");
describe("BacktrackRepo", function () {
    describe("#getBacktrackStatus", function () {
        it("(0, 0) should return values", function () {
            var point = new point_1.default(0, 0);
            var expectedPointBacktrackStatus = new point_backtrack_status_1.default(backtrack_status_1.default.CLOSED, backtrack_status_1.default.CLOSED, backtrack_status_1.default.NOT_VISITED_CHILD, backtrack_status_1.default.CLOSED);
            return backtrack_repo_1.default.getBacktrackStatus(point).then(function (actualBacktrackStatus) {
                Chai.assert.deepStrictEqual(actualBacktrackStatus, expectedPointBacktrackStatus);
            });
        });
    });
});
