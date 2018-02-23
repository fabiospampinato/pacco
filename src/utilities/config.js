
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      path = require ( 'path' ),
      file = require ( './file' );

/* CONFIG */

const config = {

  getArg () {

    return argv.config || argv.c;

  },

  getPath () {

    const arg = config.getArg ();

    if ( !arg ) return;

    const obj = config.getObjJSON ();

    if ( _.isPlainObject ( obj ) ) return;

    return path.isAbsolute ( arg ) ? arg : path.resolve ( process.cwd (), arg );

  },

  getObjJSON () {

    const arg = config.getArg ();

    if ( !arg ) return;

    const obj = _.attempt ( JSON.parse, arg );

    return _.isError ( obj ) ? undefined : obj;

  },

  getObj () {

    const arg = config.getArg ();

    if ( !arg ) return;

    return config.getObjJSON () || file.load ( config.getPath () );

  },

  _concatArgs ( ...args ) { // In order to support all different variants of each supported flag

    const values = _.compact ( _.concat ( ...args ) );

    switch ( values.length ) {
      case 0: return;
      case 1: return values[0];
      default: return values;
    }

  },

  getDynamicObj () {

    const src = config._concatArgs ( argv.source, argv.src, argv.s ),
          dist = config._concatArgs ( argv.distribution, argv.destination, argv.dist, argv.dest, argv.dst, argv.d ),
          target = config._concatArgs ( argv.target, argv.t ),
          environment = config._concatArgs ( argv.environments, argv.environment, argv.envs, argv.env, argv.e );

    return {
      target,
      environment,
      paths: {
        tokens: { src, dist }
      }
    };

  }

};

/* EXPORT */

module.exports = config;
