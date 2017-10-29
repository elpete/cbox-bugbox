const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  resolve: {
	  alias: {
      vue: 'vue/dist/vue.js',
  		"@node_modules": path.resolve(__dirname, 'node_modules'),
  		"@bugbox" : path.resolve(__dirname, 'modules/bugbox/resources/js'),
  		"@dist" : path.resolve(__dirname, 'modules/bugbox/includes')
	  },
	  extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader'
      },
	    {
	        test: /\.less$/,
	        use: extractLess.extract({
	            use: [{
	                loader: "css-loader"
	            }, {
	                loader: "less-loader"
	            }],
	            // use style-loader in development
	            fallback: "style-loader"
	        })
	    },
	    {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'autoprefixer-loader'],
                fallback: 'style-loader'
            })
        },
        {
            test: /\.(gif|jpg|png)\??.*$/,
            loader: 'url-loader?limit=1024'
        },
        {
        	   test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
             loader: 'url-loader?limit=100000'
        },
        {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
	    filename: "[name].[contenthash].css",
	    disable: process.env.NODE_ENV === "development"
	})
  ],
  entry: path.resolve( __dirname , 'modules/bugbox/resources/js/module.js' ),
  output: {
    filename: 'module.js',
    path: path.resolve(   __dirname , 'modules/bugbox/includes' )
  }
};