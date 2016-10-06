var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


var devServer = new WebpackDevServer(
    webpack(config),
    {
        contentBase: __dirname + '/dist',
    }
).listen(3000, 'localhost');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJXZWJwYWNrIGNvbmZpZy93ZWJwYWNrLWRldi1zZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHdlYnBhY2sgPSByZXF1aXJlKCd3ZWJwYWNrJyk7XHJcbnZhciBXZWJwYWNrRGV2U2VydmVyID0gcmVxdWlyZSgnd2VicGFjay1kZXYtc2VydmVyJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuL3dlYnBhY2suY29uZmlnLmpzJyk7XHJcblxyXG5cclxudmFyIGRldlNlcnZlciA9IG5ldyBXZWJwYWNrRGV2U2VydmVyKFxyXG4gICAgd2VicGFjayhjb25maWcpLFxyXG4gICAge1xyXG4gICAgICAgIGNvbnRlbnRCYXNlOiBfX2Rpcm5hbWUgKyAnL2Rpc3QnLFxyXG4gICAgfVxyXG4pLmxpc3RlbigzMDAwLCAnbG9jYWxob3N0Jyk7Il0sImZpbGUiOiJXZWJwYWNrIGNvbmZpZy93ZWJwYWNrLWRldi1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
