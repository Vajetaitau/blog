import QueryBuilder from '../repositories/query/query-builder';

new QueryBuilder()
    .addQuery(
        "create table if not exists labyrinth (     " +
        "x integer not null,                        " +
        "y integer not null,                        " +
        "north varchar(50) not null,                " +
        "south varchar(50) not null,                " +
        "east varchar(50) not null,                 " +
        "west varchar(50) not null,                 " +
        "primary key (x, y)                         " +
        ")"
        , (res) => {
            console.log(res);
        })
    .addQuery(
        "create table if not exists backtrack_info (" +
        "x integer not null,                        " +
        "y integer not null,                        " +
        "north varchar(50) not null,                " +
        "south varchar(50) not null,                " +
        "east varchar(50) not null,                 " +
        "west varchar(50) not null,                 " +
        "primary key (x, y)                         " +
        ")"
        , (res) => {
            console.log(res);
        })
    .addQuery(
        "create table if not exists player (" +
        "name varchar(20) not null,         " +
        "x integer not null,                " +
        "y integer not null,                " +
        "primary key (name)" +
        ")"
        , (res) => {
            console.log(res);
        }
    )
    .executeInTransaction();