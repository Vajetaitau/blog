"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_builder_1 = require("../repositories/query/query-builder");
new query_builder_1.default()
    .addQuery("create table if not exists labyrinth (" +
    "x integer not null," +
    "y integer not null," +
    "north varchar(50) not null," +
    "south varchar(50) not null," +
    "east varchar(50) not null," +
    "west varchar(50) not null," +
    "primary key (x, y)" +
    ")", function (res) {
    console.log(res);
})
    .addQuery("create table if not exists backtrack_info (" +
    "x integer not null," +
    "y integer not null," +
    "north varchar(50) not null," +
    "south varchar(50) not null," +
    "east varchar(50) not null," +
    "west varchar(50) not null," +
    "primary key (x, y)" +
    ")", function (res) {
    console.log(res);
})
    .executeInTransaction();
