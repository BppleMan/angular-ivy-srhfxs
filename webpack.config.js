const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require("fs");
const {lstatSync, readlinkSync} = fs;
const path = require("path");
const {resolve} = path;

let esmLibPath = resolve("node_modules", "esm-lib");
const stat = lstatSync(esmLibPath);
if (stat.isSymbolicLink()) {
    esmLibPath = resolve("node_modules", readlinkSync(esmLibPath));
}

console.log("monacoPath", esmLibPath);

module.exports = {
    mode: "development",
    output: {
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: esmLibPath,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.ttf$/,
                include: esmLibPath,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}
