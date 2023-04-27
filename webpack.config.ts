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

type Params = {
  isBuild: boolean;
  isServe: boolean;
};

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

function getConfig(env: Env): Configuration {
  const params: Params = {
    isBuild: !!env.WEBPACK_BUILD,
    isServe: !!env.WEBPACK_SERVE,
  };

  return {
    mode: env.WEBPACK_SERVE ? 'development' : 'production',
    entry: {
      app: './src/index.ts',
    },
    output: {
      publicPath: '/',
      path: dist,
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      preferAbsolute: true,
      modules: [src, 'node_modules'],
      mainFiles: ['index'],
      alias: {},
    },
    devServer: getDevServer(params),
    plugins: getPlugins(params),
    module: getModules(),
    optimization: getOptimization(params),
  };
}

function getPlugins({ isServe }: Params): webpack.WebpackPluginInstance[] {
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
    new ForkTsCheckerWebpackPlugin({
      async: isServe,
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: true,
          global: true,
        },
        mode: 'write-references',
      },
    }),
  ];

  if (isServe) {
    plugins.push(
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
  isServe,
}: Params): WebpackDevServerConfiguration | undefined {
  if (isServe) {
    return {
      open: true,
      port: 3000,
      hot: true,
      client: {
        overlay: true,
      },
      historyApiFallback: true,
    };
  }
  return undefined;
}

function getOptimization({ isServe }: Params): Configuration['optimization'] {
  if (isServe) {
    return {
      runtimeChunk: 'single'
    };
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
