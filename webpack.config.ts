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

type Params = {
  isDev: boolean;
};

function getConfig(env: Env): Configuration {
  const params: Params = {
    isDev: env.mode === 'development',
  };

  return {
    mode: env.mode || 'development',
    entry: {
      app: './src/index.ts',
      hot: 'webpack/hot/dev-server.js',
      client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
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
    devServer: getDevServer(params),
    plugins: getPlugins(params),
    module: getModules(),
    optimization: getOptimization(),
  };
}

function getPlugins({ isDev }: Params): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      publicPath: '/',
      title: 'Kobezzza forever',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no',
        charset: 'UTF-8',
      },
    }),
  ];

  if (isDev) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProgressPlugin(),
    );
  }
  return plugins;
}

function getModules(): webpack.ModuleOptions {
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
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
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

function getDevServer({ isDev }: Params): WebpackDevServerConfiguration | undefined {
  if (isDev) {

    return {
      static: path.join(__dirname, 'dist'),
      open: true,
      port: 3000,
      hot: true,
      client: {
        overlay: true,
      },
      historyApiFallback: true,
    };
  }
  return undefined
}

function getOptimization(): Configuration['optimization'] {
  return {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  };
}

export default getConfig;
