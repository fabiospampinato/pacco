
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      path = require ( 'path' ),
      file = require ( './file' );

/* CONFIG */

const config = {

  getPath () {

    if ( !argv.config ) return;

    const obj = config.getObjJSON ();

    if ( _.isPlainObject ( obj ) ) return;

    return path.isAbsolute ( argv.config ) ? argv.config : path.resolve ( process.cwd (), argv.config );

  },

  getObjJSON () {

    if ( !argv.config ) return;

    const obj = _.attempt ( JSON.parse, argv.config );

    return _.isError ( obj ) ? undefined : obj;

  },

  getObj () {

    if ( !argv.config ) return;

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
          environment = config._concatArgs ( argv.environments, argv.environment, argv.envs, argv.env, argv.e );

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
