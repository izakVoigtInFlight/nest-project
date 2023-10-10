const { composePlugins, withNx } = require('@nx/webpack');

const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

module.exports = composePlugins(withNx(), (config) => {
  // Rule setted to fix class-validator adaptation with webpack
  // If removed, class-validator will not execute any validation at any point
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'swc-loader',
      options: swcDefaultConfig,
    },
  })

  return config;
});
