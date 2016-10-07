var path = require("path");
module.exports ={
  //context: __dirname + "/dist",
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './src/index'],
  output: {
    //path: `${__dirname}/dist/`,
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
          test: /\.html/,
          loader: 'html',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
    ],
  },
  watch: true,
  externals: {
       "jquery": "jQuery"
   },

};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS93ZWJwYWNrLmNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5tb2R1bGUuZXhwb3J0cyA9e1xyXG4gIC8vY29udGV4dDogX19kaXJuYW1lICsgXCIvZGlzdFwiLFxyXG4gIGRldnRvb2w6ICdpbmxpbmUtc291cmNlLW1hcCcsXHJcbiAgZW50cnk6IFsnYmFiZWwtcG9seWZpbGwnLCAnLi9zcmMvaW5kZXgnXSxcclxuICBvdXRwdXQ6IHtcclxuICAgIC8vcGF0aDogYCR7X19kaXJuYW1lfS9kaXN0L2AsXHJcbiAgICBwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIiksXHJcbiAgICBmaWxlbmFtZTogJ2J1bmRsZS5qcycsXHJcblxyXG4gIH0sXHJcbiAgbW9kdWxlOiB7XHJcbiAgICBsb2FkZXJzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXN0OiAvXFwuanMkLyxcclxuICAgICAgICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcclxuICAgICAgICBsb2FkZXI6ICdiYWJlbCcsXHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgIHByZXNldHM6IFsnZXMyMDE1JywgJ3N0YWdlLTAnXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgICB0ZXN0OiAvXFwuaHRtbC8sXHJcbiAgICAgICAgICBsb2FkZXI6ICdodG1sJyxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcclxuICAgICAgICBsb2FkZXI6ICdzdHlsZSFjc3M/bW9kdWxlcycsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgd2F0Y2g6IHRydWUsXHJcbiAgZXh0ZXJuYWxzOiB7XHJcbiAgICAgICBcImpxdWVyeVwiOiBcImpRdWVyeVwiXHJcbiAgIH0sXHJcblxyXG59O1xyXG4iXSwiZmlsZSI6IkJhY2tib25lL3dlYnBhY2suY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
