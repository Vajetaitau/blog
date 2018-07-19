"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var labyrinth_controller_1 = require("./controllers/labyrinth-controller");
var app = express_1.default();
// Cors library is only required, when accessing controllers in same domain
// TODO: maybe delete later, if not neccessary any more 2018-06-08
app.use(cors_1.default());
app.options("*", cors_1.default());
// Register controllers
labyrinth_controller_1.default(app);
app.get("/", function (req, res) { return res.send("Hello world!x"); });
app.listen(3000, function () { return console.log("Example app listening on port 3000x!"); });
