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
var pool_1 = require("./pool");
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this._queryArray = [];
        this._pool = pool_1.default;
    }
    QueryBuilder.prototype.executeInAsyncTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, responseArray, _i, _a, queryObj, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._pool.connect()];
                    case 1:
                        client = _b.sent();
                        responseArray = new Array();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, 11, 12]);
                        return [4 /*yield*/, client.query("BEGIN")];
                    case 3:
                        _b.sent();
                        _i = 0, _a = this._queryArray;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        queryObj = _a[_i];
                        return [4 /*yield*/, client.query(queryObj.query, queryObj.values)];
                    case 5:
                        response = _b.sent();
                        queryObj.successCallback(response);
                        responseArray.push(response);
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, client.query("COMMIT")];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9:
                        e_1 = _b.sent();
                        return [4 /*yield*/, client.query("ROLLBACK")];
                    case 10:
                        _b.sent();
                        throw e_1;
                    case 11:
                        client.release();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, responseArray];
                }
            });
        });
    };
    QueryBuilder.prototype.addQuery = function (query, successCallback, values) {
        this._queryArray.push(new Query(query, successCallback, values));
        return this;
    };
    QueryBuilder.prototype.query = function (queryString, values) {
        return pool_1.default.query(queryString, values);
    };
    QueryBuilder.prototype.executeInTransaction = function () {
        var _this = this;
        this._pool.connect(function (err, client, done) {
            var shouldAbort = function (err) {
                if (err) {
                    console.error('Error in transaction', err.stack);
                    client.query('ROLLBACK', function (err) {
                        if (err) {
                            console.error('Error rolling back client', err.stack);
                        }
                        // release the client back to the pool
                        done();
                    });
                }
                return !!err;
            };
            client.query('BEGIN', function (err) {
                if (shouldAbort(err)) {
                    return;
                }
                _this._queryArray.forEach(function (queryObj) {
                    client.query(queryObj.query, queryObj.values, function (err, res) {
                        if (shouldAbort(err)) {
                            return;
                        }
                        queryObj.successCallback(res);
                    });
                });
                client.query("COMMIT", function (err) {
                    if (err) {
                        console.error("Error committing transaction", err.stack);
                    }
                    done();
                });
            });
        });
    };
    return QueryBuilder;
}());
var Query = /** @class */ (function () {
    function Query(query, successCallback, values) {
        this._query = query;
        this._values = values;
        this._successCallback = successCallback;
    }
    Object.defineProperty(Query.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Query.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Query.prototype, "successCallback", {
        get: function () {
            return this._successCallback;
        },
        enumerable: true,
        configurable: true
    });
    return Query;
}());
exports.default = QueryBuilder;
