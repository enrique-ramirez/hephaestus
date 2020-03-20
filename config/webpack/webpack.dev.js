const plugins = []

module.exports = require('./webpack.common')({
  mode: 'development',
  devtool: 'source-map',
  plugins,
  performance: {
    hints: false,
  },
  watch: true,
})
