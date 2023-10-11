const { composePlugins, withNx } = require('@nx/webpack');
const nodeExternals = require('webpack-node-externals');

const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory().swcOptions;

module.exports = composePlugins(withNx({ skipTypeChecking: false }), config => {
  // Custom configurations setted to maximize compatibility between NestJS and NX following some configs from NestJS CLI
  // See: https://github.com/nestjs/nest-cli/blob/master/lib/compiler/defaults/webpack-defaults.ts
  config.target = 'node';
  config.ignoreWarnings = [/^(?!CriticalDependenciesWarning$)/];
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'swc-loader',
      options: swcDefaultConfig,
    },
  });
  config.externals = [nodeExternals()];
  config.externalsPresets = { node: true };
  config.mode = 'none';
  config.optimization = {
    nodeEnv: 'false',
  };
  config.node = {
    __filename: false,
    __dirname: false,
  };

  return config;
});
