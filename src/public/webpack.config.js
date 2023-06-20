const path = require('path');
var webpack = require("webpack");
// const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin"); // we replace uglify w/ terser which supports ES6
// const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const exec = require('child_process').exec;

module.exports = {
  // watch: true,
  // ignore changes in node_modules
  watchOptions: {
    ignored: /node_modules/
  },

  // bundling mode
  mode: 'development', // production

  // entry files
  // entry: {
  //   login: './login/login.js',
  //   main: './main/main.ts',
  //   'main/microCanvas': './main/microCanvas/popup.ts',
  //   // 'main/.uploadPreview': './main/.uploadPreview/popup.ts'
  // },
  entry: './index.ts',

  // output bundle
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname),
  },

  // file resolutions
  resolve: {
    extensions: ['.ts', '.js'],
    // fallback: {
    //   path: require.resolve("path-browserify"),
    //   util: require.resolve("util"),
    //   stream: require.resolve("stream-browserify"),
    //   zlib: require.resolve("browserify-zlib"),
    //   assert: require.resolve("assert/"),
    //   fs: require.resolve("browserify-fs")
    //   //
    // }
    //   alias: {
    //     'npm-library': path.resolve('/home/tony/Desktop/PROJECTS/4. messenger/node_modules/material-components-web/index.js')
    //   }
  },



  // loaders
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {
        allowTsInNodeModules: true
      }


      // test: /\.tsx?/,
      // use: 'ts-loader',
      // loader: 'ts-loader',

      // exclude: /node_modules/,
      // options: {
      //   allowTsInNodeModules: true
      // }
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.browser': 'true'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // https://stackoverflow.com/questions/30312715/run-command-after-webpack-build
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec('notify-send "Webpack" "$(date)\nWebpack has finished compiling..."', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }


    // new IgnoreNotFoundExportPlugin()
  ],

  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      // cache: true,

      terserOptions: {
        compress: {
          arrows: false,
          booleans: false,
          // cascade: false,
          collapse_vars: false,
          comparisons: false,
          // computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: false,
          inline: false,
          join_vars: false,
          keep_infinity: true,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          sequences: false,
          side_effects: false,
          switches: false,
          top_retain: false,
          toplevel: false,
          typeofs: false,
          unused: false,

          // Switch off all types of compression except those needed to convince
          // react-devtools that we're using a production build
          conditionals: true,
          dead_code: true,
          evaluate: true,
        },
        mangle: true,
      },

    })],
  },

};