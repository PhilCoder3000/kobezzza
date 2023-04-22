import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

type Env = {
  WEBPACK_BUNDLE?: boolean;
  WEBPACK_BUILD?: boolean;
  WEBPACK_SERVE?: boolean;
};

type Args = {
  mode: 'development' | 'production';
  env: Env;
};

type Params = {
  isBuild: boolean;
  isServe: boolean;
  isDev: boolean;
};

function getConfig(env: Env, args: Args): Configuration {
  const params: Params = {
    isBuild: !!env.WEBPACK_BUILD,
    isServe: !!env.WEBPACK_SERVE,
    isDev: args.mode === 'development',
  };

  return {
    mode: args.mode || 'development',
    entry: {
      app: './src/index.ts',
      hot: 'webpack/hot/dev-server.js',
      client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devServer: getDevServer(params),
    plugins: getPlugins(params),
    module: getModules(),
    optimization: getOptimization(params),
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

function getDevServer({
  isDev,
}: Params): WebpackDevServerConfiguration | undefined {
  if (isDev) {
    return {
      static: path.join(__dirname, 'dist'),
      open: true,
      port: 3000,
      client: {
        overlay: true,
      },
      historyApiFallback: true,
    };
  }
  return undefined;
}

function getOptimization({ isDev }: Params): Configuration['optimization'] {
  if (isDev) {
    return undefined;
  }
  return {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
    sideEffects: false,
  };
}

export default getConfig;
