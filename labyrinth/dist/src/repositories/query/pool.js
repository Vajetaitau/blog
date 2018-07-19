"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
exports.default = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_labyrinth',
    password: 'postgres',
    port: 5432,
});
