
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

  /* ENVIRONMENT */

  environments,
  environment: 'default' // Supports 'env', `[env1[, env2]]` and `env1[,env2[,..]]`

};

/* EXPORT */

module.exports = defaults;
