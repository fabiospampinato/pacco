
/* REQUIRE */

const components = require ( './components' ),
      environments = require ( './environments' ),
      targets = require ( './targets' ),
      paths = require ( './paths' ),
      plugins = require ( './plugins' );

/* DEFAULTS */

const defaults = {

  /* ENGINES */ // Target these engine(s) when compiling

  browsers: ['ie >= 9'],
  node: 'current',

  /* GENERAL */

  components,
  paths,
  plugins,

  /* TARGET */

  targets,
  target: 'web',

  /* ENVIRONMENT */

  environments,
  environment: 'production' // Supports 'env', `[env1[, env2]]` and `env1[,env2[,..]]`

};

/* EXPORT */

module.exports = defaults;
