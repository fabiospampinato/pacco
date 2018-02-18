
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      path = require ( 'path' ),
      file = require ( './file' );

/* CONFIG */

const config = {

  getPath () {

    if ( !argv.config ) return;

    const config = config.getObjJSON ();

    if ( _.isPlainObject ( config ) ) return;

    return path.isAbsolute ( argv.config ) ? argv.config : path.resolve ( process.cwd (), argv.config );

  },

  getObjJSON () {

    if ( !argv.config ) return;

    const config = _.attempt ( JSON.parse, argv.config );

    return _.isError ( config ) ? undefined : config;

  },

  getObj () {

    if ( !argv.config ) return;

    return config.getConfigObjJSON () || file.load ( config.getConfigPath () );

  },

  getDynamicObj () {

    const src = argv.source || argv.src || argv.s,
          dist = argv.distribution || argv.destination || argv.dist || argv.dest || argv.dst || argv.d,
          environment = argv.environments || argv.environment || argv.envs || argv.env || argv.e;

    return {
      environment,
      paths: {
        tokens: { src, dist }
      }
    };

  }

};

/* EXPORT */

module.exports = config;
