var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = function(options) {
  var entry, jsLoaders, plugins, cssLoaders;


  if(options.prod)
  {

  }
  else {
    entry = [
    "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
    "webpack/hot/only-dev-server", // See above
    path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
  ];
  cssLoaders = 'style-loader!css-loader!postcss-loader';
  // Only plugin is the hot module replacement plugin
  plugins = [
      new webpack.HotModuleReplacementPlugin(), // Make hot loading work
      new HtmlWebpackPlugin({
        template: 'index.html', // Move the index.html file
        inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
      })
    ]
  }

  return {
    entry: entry,
    output: { // Compile into js/build.js
      path: path.resolve(__dirname, 'build'),
      filename: "js/bundle.js"
    },
    module: {
      loaders: [{
          test: /\.js$/, // Transform all .js files required somewhere within an entry point...
          loader: 'babel', // ...with the specified loaders...
          exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
        }, {
          test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
          loader: cssLoaders // ...with PostCSS
        }, {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "url-loader?limit=10000"
        }
      ]
  },
  plugins: plugins,
  postcss: function() {
        return [
          require('postcss-import')({ // Import all the css files...
            glob: true,
            onImport: function (files) {
                files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
            }.bind(this) // ...so they get hot–reloaded when something changes...
          }),
          require('postcss-simple-vars')(), // ...then replace the variables...
          require('postcss-focus')(), // ...add a :focus to ever :hover...
          require('autoprefixer')({ // ...and add vendor prefixes...
            browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
          }),
          require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
            clearMessages: true
          })
        ];
      },
      target: "web", // Make web variables accessible to webpack, e.g. window
      stats: false, // Don't show stats in the console
      progress: true
    }
  };