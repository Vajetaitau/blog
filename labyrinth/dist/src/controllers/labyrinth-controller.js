"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var labyrinth_service_1 = require("../services/labyrinth-service");
var express_1 = require("express");
var router = express_1.default();
router.post("/", function (request, response) {
    console.log("xxx");
});
router.get("/", function (request, response) {
    labyrinth_service_1.default.createLabyrinth(5, 5);
    var labyrinth = labyrinth_service_1.default.getLabyrinth();
    response.send(labyrinth);
});
function default_1(app) {
    console.log("Labyrinth controller!");
    app.use("/labyrinth", router);
}
exports.default = default_1;
