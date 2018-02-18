
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
