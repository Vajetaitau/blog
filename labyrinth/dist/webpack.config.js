var path = require("path");
var nodeExternals = require("webpack-node-externals");
var NodemonPlugin = require("nodemon-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/app.js",
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader",
            //     exclude: /node_modules/
            // },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    plugins: [
        new NodemonPlugin(),
    ],
};
