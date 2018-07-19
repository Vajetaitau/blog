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
var query_builder_1 = require("./query/query-builder");
var LabyrinthRepo = /** @class */ (function () {
    function LabyrinthRepo() {
        this._sizeConstant = 1000;
        this._labyrinthTable = new Array(this._sizeConstant);
        this._labyrinthTable.forEach(function (row, index) {
            this._labyrinthTable[index] = new Array(this._sizeConstant);
        });
    }
    LabyrinthRepo.prototype.getOptions = function (point) {
        var options = [];
        if (this.exists(point.northPoint())) {
            options.push(direction_1.default.NORTH);
        }
        if (this.exists(point.southPoint())) {
            options.push(direction_1.default.SOUTH);
        }
        if (this.exists(point.eastPoint())) {
            options.push(direction_1.default.EAST);
        }
        if (this.exists(point.westPoint())) {
            options.push(direction_1.default.WEST);
        }
        return options;
    };
    LabyrinthRepo.prototype.exists = function (point) {
        return !!this.getPoint(point.x, point.y);
    };
    LabyrinthRepo.prototype.getPoint = function (x, y) {
        // x and y coordinates can be negative as well as positive
        // so we always have to add some amount, to transform to
        // array indexes
        var ammountToAdd = this._sizeConstant / 2;
        return this._labyrinthTable[y + ammountToAdd][x + ammountToAdd];
    };
    LabyrinthRepo.prototype.getPointX = function (x, y) {
        return new query_builder_1.default()
            .query("select l.north north, l.south south, l.east east, l.west west, bi.north b_north, bi.south b_south, bi.east b_east, bi.west b_west " +
            "from labyrinth as l " +
            "inner join backtrack_info as bi on l.x = bi.x and l.y = bi.y " +
            "where l.x = $1 " +
            "and l.y = $2", [x, y])
            .then(function (res) {
            var firstRow = res.rows[0];
            return new point_1.default(x, y, firstRow.north, firstRow.south, firstRow.east, firstRow.west, firstRow.b_north, firstRow.b_south, firstRow.b_east, firstRow.b_west);
        });
    };
    // returns directions, where neigbour points exist
    LabyrinthRepo.prototype.getNeighbourPointDirections = function (x, y) {
        return new query_builder_1.default()
            .query("select 'NORTH' d     " +
            "from labyrinth       " +
            "where x = $1         " +
            "and y = $2 + 1       " +
            "union                " +
            "select 'SOUTH' d     " +
            "from labyrinth       " +
            "where x = $1         " +
            "and y = $2 - 1       " +
            "union                " +
            "select 'EAST' d      " +
            "from labyrinth       " +
            "where x = $1 + 1     " +
            "and y = $2           " +
            "union                " +
            "select 'WEST' d      " +
            "from labyrinth       " +
            "where x = $1 - 1     " +
            "and y = $2           ", [x, y]).then(function (res) {
            var rows = res.rows;
            return _.map(rows, function (row) {
                return row.d;
            });
        });
    };
    LabyrinthRepo.prototype.saveNewPoint = function (point, parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(parent);
                        return [4 /*yield*/, new query_builder_1.default()
                                .addQuery("update backtrack_info                            " +
                                "set north = $3, south = $4, east = $5, west = $6 " +
                                "where x = $1                                     " +
                                "and y = $2                                       ", function (res) {
                                // console.log(res);
                            }, [
                                parent.x, parent.y,
                                parent.backtrackNorth, parent.backtrackSouth,
                                parent.backtrackEast, parent.backtrackWest
                            ])
                                .addQuery("insert into                                  " +
                                "labyrinth(x, y, north, south, east, west)    " +
                                "values ($1, $2, $3, $4, $5, $6)              ", function (res) {
                                // console.log(res);
                            }, [point.x, point.y, point.north, point.south, point.east, point.west])
                                .addQuery("insert into                                    " +
                                "backtrack_info(x, y, north, south, east, west) " +
                                "values ($1, $2, $3, $4, $5, $6)                ", function (res) {
                                // console.log(res);
                            }, [
                                point.x, point.y,
                                point.backtrackNorth, point.backtrackSouth,
                                point.backtrackEast, point.backtrackWest
                            ])
                                .executeInAsyncTransaction()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LabyrinthRepo;
}());
exports.default = new LabyrinthRepo();
