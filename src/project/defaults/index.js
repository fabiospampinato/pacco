
/* REQUIRE */

const components = require ( './components' ),
      environments = require ( './environments' ),
      paths = require ( './paths' ),
      plugins = require ( './plugins' );

/* DEFAULTS */

const defaults = {

  /* GENERAL */

  components,
  paths,
  plugins,
  isDevelopment: false, // Setting `isDevelopment: true` will basically make the build process faster, some plugins will be skipped and javascript will get partial compilation so it's much faster to watch and rebuild on changes

  /* ENVIRONMENT */

  environments,
  environment: 'default' // Supports 'env', `[env1[, env2]]` and `env1[,env2[,..]]`

};

/* EXPORT */

module.exports = defaults;
