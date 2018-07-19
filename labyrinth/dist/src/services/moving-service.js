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
var point_1 = require("../models/point");
var direction_1 = require("../enums/direction");
var labyrinth_repo_1 = require("../repositories/labyrinth-repo");
var direction_status_1 = require("../enums/direction-status");
var backtrack_status_1 = require("../enums/backtrack-status");
var MovingService = /** @class */ (function () {
    function MovingService() {
    }
    MovingService.prototype.move = function (moveFrom, moveTo) {
        return __awaiter(this, void 0, void 0, function () {
            var newCoord, neighbourDirections, parentDirection, nextPoint, parentForNextPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newCoord = moveFrom.pointInDirection(moveTo);
                        return [4 /*yield*/, labyrinth_repo_1.default.getNeighbourPointDirections(newCoord.x, newCoord.y)];
                    case 1:
                        neighbourDirections = _a.sent();
                        parentDirection = direction_1.default.oposite(moveTo);
                        nextPoint = this.getNextPoint(newCoord, parentDirection, neighbourDirections);
                        parentForNextPoint = this.getMoveFromWithVisitedChild(moveFrom, moveTo);
                        return [4 /*yield*/, labyrinth_repo_1.default.saveNewPoint(nextPoint, parentForNextPoint)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, nextPoint];
                }
            });
        });
    };
    MovingService.prototype.getMoveFromWithVisitedChild = function (moveFrom, moveTo) {
        var northBS = moveFrom.backtrackNorth;
        var southBS = moveFrom.backtrackSouth;
        var eastBS = moveFrom.backtrackEast;
        var westBS = moveFrom.backtrackWest;
        if (moveTo === direction_1.default.NORTH) {
            northBS = backtrack_status_1.default.VISITED_CHILD;
        }
        else if (moveTo === direction_1.default.SOUTH) {
            southBS = backtrack_status_1.default.VISITED_CHILD;
        }
        else if (moveTo === direction_1.default.EAST) {
            eastBS = backtrack_status_1.default.VISITED_CHILD;
        }
        else if (moveTo === direction_1.default.WEST) {
            westBS = backtrack_status_1.default.VISITED_CHILD;
        }
        else {
            throw new Error("Wrong direction argument: " + moveTo);
        }
        return new point_1.default(moveFrom.x, moveFrom.y, moveFrom.north, moveFrom.south, moveFrom.east, moveFrom.west, northBS, southBS, eastBS, westBS);
    };
    MovingService.prototype.getNextPoint = function (newCoord, parentDirection, neighbourDirections) {
        var north = this.getDirectionStatus(direction_1.default.NORTH, neighbourDirections, parentDirection);
        var south = this.getDirectionStatus(direction_1.default.SOUTH, neighbourDirections, parentDirection);
        var east = this.getDirectionStatus(direction_1.default.EAST, neighbourDirections, parentDirection);
        var west = this.getDirectionStatus(direction_1.default.WEST, neighbourDirections, parentDirection);
        var northBS = this.getBacktrackStatus(direction_1.default.NORTH, neighbourDirections, parentDirection);
        var southBS = this.getBacktrackStatus(direction_1.default.SOUTH, neighbourDirections, parentDirection);
        var eastBS = this.getBacktrackStatus(direction_1.default.EAST, neighbourDirections, parentDirection);
        var westBS = this.getBacktrackStatus(direction_1.default.WEST, neighbourDirections, parentDirection);
        return new point_1.default(newCoord.x, newCoord.y, north, south, east, west, northBS, southBS, eastBS, westBS);
    };
    MovingService.prototype.getDirectionStatus = function (neighbourDirection, existingNeighboars, parentDirection) {
        var neighbourExists = _.includes(existingNeighboars, neighbourDirection);
        return neighbourExists && neighbourDirection !== parentDirection ? direction_status_1.default.CLOSED : direction_status_1.default.OPEN;
    };
    MovingService.prototype.getBacktrackStatus = function (neighbourDirection, existingNeighboars, parentDirection) {
        if (neighbourDirection === parentDirection) {
            return backtrack_status_1.default.PARENT;
        }
        else {
            var neighbourExists = _.includes(existingNeighboars, neighbourDirection);
            if (neighbourExists) {
                return backtrack_status_1.default.CLOSED;
            }
            else {
                return backtrack_status_1.default.NOT_VISITED_CHILD;
            }
        }
    };
    return MovingService;
}());
exports.movingService = new MovingService();
