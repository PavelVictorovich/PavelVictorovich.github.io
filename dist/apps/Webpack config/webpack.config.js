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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJXZWJwYWNrIGNvbmZpZy93ZWJwYWNrLmNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5tb2R1bGUuZXhwb3J0cyA9e1xyXG4gICAgLy9jb250ZXh0OiBfX2Rpcm5hbWUgKyBcIi9kaXN0XCIsXHJcbiAgICBkZXZ0b29sOiAnaW5saW5lLXNvdXJjZS1tYXAnLFxyXG4gICAgZW50cnk6IFsnYmFiZWwtcG9seWZpbGwnLCAnLi9zcmMvaW5kZXgnXSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vcGF0aDogYCR7X19kaXJuYW1lfS9kaXN0L2AsXHJcbiAgICAgICAgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpLFxyXG4gICAgICAgIGZpbGVuYW1lOiAnYnVuZGxlLmpzJyxcclxuXHJcbiAgICB9LFxyXG4gICAgbW9kdWxlOiB7XHJcbiAgICAgICAgbG9hZGVyczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuanMkLyxcclxuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxyXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAnYmFiZWwnLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRzOiBbJ2VzMjAxNScsICdzdGFnZS0wJ10sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuaHRtbC8sXHJcbiAgICAgICAgICAgICAgICBsb2FkZXI6ICdodG1sJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGVzdDogL1xcLmNzcyQvLFxyXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAnc3R5bGUhY3NzP21vZHVsZXMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHRydWUsXHJcbiAgICBleHRlcm5hbHM6IHtcclxuICAgICAgICBcImpxdWVyeVwiOiBcImpRdWVyeVwiXHJcbiAgICB9LFxyXG5cclxufTsiXSwiZmlsZSI6IldlYnBhY2sgY29uZmlnL3dlYnBhY2suY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
