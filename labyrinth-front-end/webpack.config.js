const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    node: {
        __filename: false, // those took me 4 houes to figure out, apperently webpack
        __dirname: false   // by defaul overrides node.js defaults. Fun, fun, fun
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {}
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: "file-loader",
                    query: {
                        name: "[name].[ext]"
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts'] // enables users to leave off the extension when importing
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    plugins: [
        new NodemonPlugin(), // Dong
        new CopyWebpackPlugin([{ from: 'src/public', to: 'public' }])
    ]
};