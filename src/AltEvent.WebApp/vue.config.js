const path = require("path");
// const webpack = require("webpack");
// const package = require("./package.json");

module.exports = {
    publicPath: "/",
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            extensions: [".ts", ".js", ".vue", ".json"],
            alias: {
                "@lib": path.resolve(__dirname, "../dist/lib"),
                "@": path.resolve(__dirname, "./src"),
            },
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        // devServer: {
        //     port: 8081,
        //     disableHostCheck: true,
        //     host: "localhost",
        // },
        // plugins: [
        //     new webpack.DefinePlugin({
        //         "process.env": {
        //             APP_VERSION: `"${package.version ?? "1.0.0"}"`,
        //         },
        //     }),
        // ],
    },
    chainWebpack: config => {
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap(options => {
                options.projectReferences = true;
                return options;
            });
            
        config
            .plugin("html")
            .tap(args => {
                args[0].title = "Alt EVENT";
                return args;
            });
    }
}
