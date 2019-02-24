const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        popup: path.join(__dirname, "src/popup/index.tsx"),
        options: path.join(__dirname, "src/popup/index.tsx"),
        eventPage: path.join(__dirname, "src/event-page.ts"),
        background: path.join(__dirname, "src/background.ts"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // Creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // Translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // Compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        /**
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin(
            [
                {
                    from: "./src/assets/**/*",
                    to: "../",
                    force: true,
                    flatten: true,
                }
            ],
            {
                ignore: [
                    "*.md",
                ],

                // By default the plugin only copies modified files during
                // a watch or webpack-dev-server build
                // Setting this to true copies all files
                copyUnmodified: true
            }
        ),
    ]
};
