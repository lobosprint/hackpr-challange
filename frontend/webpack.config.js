module.exports = {
  entry: './src/components/app.jsx',
  output: {
    filename: 'public/app.bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      query: {
        presets: ['es2016']
      }
    }, {
      loader: 'babel-loader',
      query: {
        presets: ['es2016', 'react']
      }
    }]
  }
}
