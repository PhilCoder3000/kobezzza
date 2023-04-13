import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

type Env = {
  mode: 'development' | 'production';
};

type Argv = {
  a: string;
};

function getConfig() {
  return {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      publicPath: '/',
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devServer: getDevServer(),
    plugins: getPlugins(),
    module: getModules(),
    optimization: getOptimization(),
  };
}

function getPlugins() {
  return [
    new HtmlWebpackPlugin({
      publicPath: '/',
      title: 'Kobezzza forever',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
        charset: 'UTF-8',
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ];
}

function getModules() {
  return {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  };
}

function getDevServer() {
  return {
    static: path.join(__dirname, 'dist'),
    open: true,
    port: 3000,
  };
}

function getOptimization() {
  return {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  };
}

export default getConfig;
