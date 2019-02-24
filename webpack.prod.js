const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function getUglifyOptions() {
    const uglifyCompressOptions = {
        pure_getters: true,
        // PURE comments work best with 3 passes.
        // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
        passes: 3,
    };

    return {
        ecma: 6,
        warnings: true, // disable verbose?
        ie8: false,
        mangle: true,
        compress: uglifyCompressOptions,
        output: {
            ascii_only: true,
            comments: false
        },
        beautify: false // set to true for debugging
    };
}

module.exports = merge(common, {
    mode: "production",
    /**
     * Stats lets you precisely control what bundle information gets displayed
     * reference: https://webpack.js.org/configuration/stats/
     */
    stats: {
        chunkModules: true,
        chunkOrigins: true,
        reasons: true,
        maxModules: Infinity, // examine all modules (ModuleConcatenationPlugin debugging)
        optimizationBailout: true, // display bailout reasons (ModuleConcatenationPlugin debugging)
    },
    performance: {
        hints: "warning",
    },
    // reference: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        flagIncludedChunks: true,
        occurrenceOrder: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: true,
        noEmitOnErrors: true,
        minimizer: [
            // minimization libraries to use
            /**
             * Plugin: UglifyJsPlugin
             * Description: Minimize all JavaScript output of chunks.
             * Loaders are switched into minimizing mode.
             *
             * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
             */
            new UglifyJsPlugin({
                parallel: true, // use multi-process parallel running to improve the build speed (default concurrent processes: os.cpus().length - 1)
                sourceMap: true, // useful to still be able to debug in production
                uglifyOptions: getUglifyOptions(),
                exclude: [
                    /\/prettier\/parser-.*/, // prettier parsers are the biggest chunks and are already minified :p
                    /\/prettier\/standalone\.js/ // also one of the prettier's biggest chunks
                ],
                cache: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            // reference: https://webpack.js.org/plugins/split-chunks-plugin/
            chunks: "all", // include all types of chunks (async or not)
            cacheGroups: {
                // assign modules to cache groups
                // cache group for all modules from node_modules that are duplicated in at least 2 chunks
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                    priority: -10,
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
});
