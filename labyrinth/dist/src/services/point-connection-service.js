"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var move_options_service_1 = require("./move-options-service");
var direction_randomizer_1 = require("../models/direction-randomizer");
var path_1 = require("../models/path");
var backtracking_service_1 = require("./backtracking-service");
var direction_randomization_service_1 = require("./direction-randomization-service");
var moving_service_1 = require("./moving-service");
var generation_service_1 = require("./generation-service");
var labyrinth_repo_1 = require("../repositories/labyrinth-repo");
var PointConnectionService = /** @class */ (function () {
    function PointConnectionService() {
    }
    PointConnectionService.prototype.connectPointsNew = function (startCoord, endCoord) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeMoves(startCoord, endCoord)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PointConnectionService.prototype.makeMoves = function (currentCoord, endCoord) {
        return __awaiter(this, void 0, void 0, function () {
            var currentPoint, options, nextPoint, directionalProbabilities, nextMoveDirection, newPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, labyrinth_repo_1.default.getPointX(currentCoord.x, currentCoord.y)];
                    case 1:
                        currentPoint = _a.sent();
                        options = generation_service_1.generationService.getAvailableOptions(currentPoint);
                        if (!(options.length > 0)) return [3 /*break*/, 4];
                        directionalProbabilities = move_options_service_1.moveOptionsService.availableOptionsProbabilitiesNew(currentPoint, endCoord, options);
                        nextMoveDirection = direction_randomization_service_1.directionRandomizationService.getRandomDirection(directionalProbabilities);
                        return [4 /*yield*/, moving_service_1.movingService.move(currentPoint, nextMoveDirection)];
                    case 2:
                        newPoint = _a.sent();
                        return [4 /*yield*/, this.makeMoves(newPoint, endCoord)];
                    case 3:
                        nextPoint = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        nextPoint = currentPoint.parentPoint();
                        _a.label = 5;
                    case 5:
                        console.log(nextPoint.x + " " + nextPoint.y);
                        if (!nextPoint.hasSameCoordinates(endCoord)) return [3 /*break*/, 6];
                        return [2 /*return*/, nextPoint];
                    case 6: return [4 /*yield*/, this.makeMoves(nextPoint, endCoord)];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PointConnectionService.prototype.connectPoints = function (startPoint, endPoint) {
        var currentPoint = startPoint;
        var path = new path_1.default([startPoint]);
        var safeguard = 1;
        while (!_.isEqual(currentPoint, endPoint)) {
            var directionalProbabilities = new Array();
            // We are doing this to make sure, that current point has moving options.
            // In the case it is closed down by a path around it. Backtrack to the 
            // point which has open options.
            while (directionalProbabilities.length == 0) {
                currentPoint = backtracking_service_1.backtrackingService.getLastOpenPoint(path);
                directionalProbabilities = move_options_service_1.moveOptionsService.availableOptionsProbabilities(path, currentPoint, endPoint);
            }
            // Get random option for the next moving direction. And assign point,
            // which is at that direction to the current point
            var directionRandomizer = new direction_randomizer_1.default(directionalProbabilities);
            var direction = directionRandomizer.randomDirection();
            currentPoint = currentPoint.pointInDirection(direction);
            // And add it to the path of course :)
            path.add(currentPoint);
            safeguard++;
            if (safeguard > 10000) {
                console.log(path.length);
                console.log(path);
                throw new Error("Could not connect points, safeguard was hit!");
            }
        }
        return path;
    };
    return PointConnectionService;
}());
exports.pointConnectionService = new PointConnectionService();
