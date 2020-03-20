const webpack = require('webpack')
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (options) => ({
  mode: options.mode,
  watch: options.watch || false,
  devtool: options.devtool,
  entry: {
    // Note: resulting app.js is unused, but it's the entry point for assets
    app: path.join(process.cwd(), 'src/app.js'),
    // Note: main.js is your main app js
    main: path.join(process.cwd(), 'src/js/main.js'),
  },
  // eslint-disable-next-line prefer-object-spread
  output: Object.assign({
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].chunk.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: './',
  }, options.output),
  externals: {
    // This is Wordpress, after all...
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (file, resourcePath, context) => {
                const relativePath = path.relative(`${context}/src/img`, resourcePath)

                return `assets/img/${relativePath}`
              },
            },
          },
          {
            loader: 'cache-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: options.mode === 'development',
            },
          },
        ],
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader?cacheDirectory=true', 'eslint-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.font\.js/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'webfonts-loader',
            options: {
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
    },
  },
  plugins: options.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      { from: 'src/screenshot.png', to: 'screenshot.png' },
      { from: 'src/favicon.png', to: 'favicon.png' },
      {
        from: 'src/**/*.php',
        to: './',
        transformPath(targetPath) {
          return targetPath.replace('src/', '')
        },
      },
    ]),
  ]),
  resolve: {
    modules: [path.resolve(__dirname, '../..', 'src'), 'node_modules'],
    extensions: [
      '.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  target: 'web',
  performance: options.performance || {},
})
