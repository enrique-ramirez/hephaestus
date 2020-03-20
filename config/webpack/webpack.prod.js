const plugins = []

module.exports = require('./webpack.common')({
  mode: 'production',
  devtool: 'source-map',
  plugins,
  performance: {
    assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
})
