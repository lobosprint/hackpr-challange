module.exports = {
  entry: './src/components/app.jsx',
  output: {
    filename: 'app.bundle.js',
    path: './public',
    publicPath: '/public/'
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
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url-loader?limit=100000&mimetype=application/font-woff'
    }, {
      test: /\.ttf$/,
      loader: 'file-loader'
    }, {
      test: /\.eot$/,
      loader: 'file-loader'
    }, {
      test: /\.svg$/,
      loader: 'file-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  }
}
