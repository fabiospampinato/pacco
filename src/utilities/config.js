
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      path = require ( 'path' ),
      file = require ( './file' );

/* CONFIG */

const config = {

  /* UTILITIES */

  _concatArgs ( ...args ) {

    const values = _.compact ( _.concat ( ...args ) );

    switch ( values.length ) {
      case 0: return;
      case 1: return values[0];
      default: return values;
    }

  },

  _getRawConfigs () {

    return _.castArray ( config._concatArgs ( argv.config, argv.c ) );

  },

  _isJSON ( str ) {

    const obj = _.attempt ( JSON.parse, str );

    return !_.isError ( obj );

  },

  _absPath ( filepath ) {

    return path.isAbsolute ( filepath ) ? filepath : path.resolve ( process.cwd (), filepath );

  },

  /* API */

  getCwd () {

    const configs = config._getRawConfigs (),
          lastPath = configs.find ( _.negate ( config._isJSON ) );

    if ( !lastPath ) return;

    return config._absPath ( lastPath );

  },

  getObj () {

    const configs = config._getRawConfigs ();

    const objs = configs.map ( c => {

      const obj = _.attempt ( JSON.parse, c );

      return _.isError ( obj ) ? file.load ( config._absPath ( c ) ) : obj;

    });

    return _.merge ( ...objs );

  },

  getDynamicObj () {

    const src = config._concatArgs ( argv.source, argv.src, argv.s ),
          dist = argv.distribution || argv.destination || argv.dist || argv.dest || argv.dst || argv.d,
          target = argv.target || argv.t,
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
