let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require('path');

let cssName = 'style.css';
let jsName = 'bundle.js';
let pPath = 'build/assets';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
];

let cssLoader = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ]
};

if (process.env.NODE_ENV === 'production') {
  cssName = 'style-[hash].css';
  jsName = 'bundle-[hash]-' + (new Date().getTime()) + '.js';

  plugins.push(new ExtractTextPlugin({
    filename: cssName
  }));
  cssLoader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader', options: {importLoaders: 1}},
        /*{
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ]
            }
          }
        }*/
      ]
    })
  };
}

plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
}));

module.exports = {
  mode: 'development',
  entry: [
    './src/index.tsx'
  ],
  output: {
    publicPath: '/',
    path: `${__dirname}/${pPath}/`,
    filename: jsName
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      Playground: path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      cssLoader,
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
    ]
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            unsafe_comps: true,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe: true,
            warnings: false,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      }),
    ]
  },
  /*externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }*/
};