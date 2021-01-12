const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const outputDir = path.join(__dirname, "dist")

module.exports = env => {
    console.log("ENVIRONMENT => ", env);
    return {

        entry: './src/Index.bs.js',
        // If you ever want to use webpack during development, change 'production'
        // to 'development' as per webpack documentation. Again, you don't have to
        // use webpack or any other bundler during development! Recheck README if
        // you didn't know this
        mode: env.production ? 'production' : 'development',
        output: {
            path: outputDir,
            filename: 'index.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                inject: false,
            }),
            new CopyWebpackPlugin(
                {
                    patterns: [
                        {from: '_redirects', to: ''},
                    ]
                }
            ),
            new CleanWebpackPlugin()
        ],
        devServer: {
            compress: true,
            contentBase: outputDir,
            port: process.env.PORT || 8000,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(jpg|png|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    },
                }
            ],
        }
    }
};
