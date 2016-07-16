const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
const entries = ['babel-polyfill', './src/index.js'];
const PORT = 8080;
if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entries.unshift(
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/dev-server'
  );
}

export default {
  plugins,
  cache: true,
  entry: entries,
  output: {
    path: path.resolve(__dirname, '..', buildDir, 'assets'),
    filename: production ? 'app-[hash].js' : 'app.js',
    publicPath: 'assets/'
  },
  display: { errorDetails: true },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-2', 'react'] }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/assets/',
    host: '0.0.0.0',
    port: PORT
  }
};
