var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


var devServer = new WebpackDevServer(
	webpack(config),
	{
		contentBase: __dirname + '/dist',
	}
).listen(8088, 'localhost');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9kZXYtc2VydmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB3ZWJwYWNrID0gcmVxdWlyZSgnd2VicGFjaycpO1xudmFyIFdlYnBhY2tEZXZTZXJ2ZXIgPSByZXF1aXJlKCd3ZWJwYWNrLWRldi1zZXJ2ZXInKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL3dlYnBhY2suY29uZmlnLmpzJyk7XG5cblxudmFyIGRldlNlcnZlciA9IG5ldyBXZWJwYWNrRGV2U2VydmVyKFxuXHR3ZWJwYWNrKGNvbmZpZyksXG5cdHtcblx0XHRjb250ZW50QmFzZTogX19kaXJuYW1lICsgJy9kaXN0Jyxcblx0fVxuKS5saXN0ZW4oODA4OCwgJ2xvY2FsaG9zdCcpO1xuIl0sImZpbGUiOiJCYWNrYm9uZS9kZXYtc2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
