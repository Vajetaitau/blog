"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var distance_service_1 = require("./distance-service");
var directional_probability_1 = require("../models/directional-probability");
var point_1 = require("../models/point");
var path_1 = require("../models/path");
var direction_1 = require("../enums/direction");
var MoveOptionsService = /** @class */ (function () {
    function MoveOptionsService() {
    }
    MoveOptionsService.prototype.availableOptionsProbabilitiesNew = function (currentPoint, endPoint, options) {
        var averageProb = 1 / options.length;
        var directionalProbs = new Array();
        if (options.find(function (opt) { return opt === direction_1.default.NORTH; })) {
            directionalProbs.push(new directional_probability_1.default(direction_1.default.NORTH, averageProb));
        }
        if (options.find(function (opt) { return opt === direction_1.default.SOUTH; })) {
            directionalProbs.push(new directional_probability_1.default(direction_1.default.SOUTH, averageProb));
        }
        if (options.find(function (opt) { return opt === direction_1.default.EAST; })) {
            directionalProbs.push(new directional_probability_1.default(direction_1.default.EAST, averageProb));
        }
        if (options.find(function (opt) { return opt === direction_1.default.WEST; })) {
            directionalProbs.push(new directional_probability_1.default(direction_1.default.WEST, averageProb));
        }
        return directionalProbs;
    };
    MoveOptionsService.prototype.availableOptions = function (takenPath, currentPoint) {
        if (!(takenPath instanceof path_1.default && currentPoint instanceof point_1.default)) {
            throw new Error("Incorrect parameters.");
        }
        var options = [];
        if (!takenPath.contains(currentPoint.northPoint())) {
            options.push(direction_1.default.NORTH);
        }
        if (!takenPath.contains(currentPoint.southPoint())) {
            options.push(direction_1.default.SOUTH);
        }
        if (!takenPath.contains(currentPoint.eastPoint())) {
            options.push(direction_1.default.EAST);
        }
        if (!takenPath.contains(currentPoint.westPoint())) {
            options.push(direction_1.default.WEST);
        }
        return options;
    };
    MoveOptionsService.prototype.availableOptionsProbabilities = function (takenPath, currentPoint, endPoint, basicProbabilityPath) {
        if (basicProbabilityPath === void 0) { basicProbabilityPath = 0.8; }
        var options = this.availableOptions(takenPath, currentPoint);
        var directionalDistance = distance_service_1.default.directionalDistance(currentPoint, endPoint);
        if (options.length === 0) {
            return [];
        }
        // now we should get options, where the point should have bigger probability to move at
        var directionalOptions = _.filter(options, function (option) {
            var isOneOfDirections = _.find(directionalDistance, { direction: option });
            return !!isOneOfDirections;
        });
        if (directionalOptions.length > 0) {
            var basicProbabilityPart_1 = 0.8;
            var basicProbability_1 = basicProbabilityPart_1 / options.length;
            if (directionalOptions.length === 1) {
                return _.map(options, function (option) {
                    var probability;
                    if (option === directionalOptions[0]) {
                        probability = basicProbability_1 + 1 - basicProbabilityPart_1;
                    }
                    else {
                        probability = basicProbability_1;
                    }
                    return new directional_probability_1.default(option, probability);
                });
            }
            else if (directionalOptions.length === 2) {
                var d1_1 = directionalDistance[0], d2_1 = directionalDistance[1];
                var directionalProbabilityCoef_1 = (1 - basicProbabilityPart_1) * (d1_1.distance * d2_1.distance) / (d1_1.distance + d2_1.distance);
                return _.map(options, function (option) {
                    var probability;
                    if (option === d1_1.direction) {
                        probability = basicProbability_1 + directionalProbabilityCoef_1 / d1_1.distance;
                    }
                    else if (option === d2_1.direction) {
                        probability = basicProbability_1 + directionalProbabilityCoef_1 / d2_1.distance;
                    }
                    else {
                        probability = basicProbability_1;
                    }
                    return new directional_probability_1.default(option, probability);
                });
            }
        }
        else {
            var basicProbability_2 = 1 / options.length;
            return _.map(options, function (option) {
                return new directional_probability_1.default(option, basicProbability_2);
            });
        }
    };
    return MoveOptionsService;
}());
exports.moveOptionsService = new MoveOptionsService();
