var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {

    entry: path.resolve(__dirname, 'src') + '/app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.jsx',
        publicPath: '/'
    },
    mode: 'production',
    // devtool: "#eval-source-map",
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "minify"],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};