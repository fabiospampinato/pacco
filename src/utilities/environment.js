
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      gulp = require ( 'gulp' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      file = require ( './file' );

/* ENVIRONMENT */

const environment = {

  /* CWD */

  getGulpCwd () {

    const configPath = environment.getConfigPath ();

    if ( !configPath ) return process.cwd ();

    return path.dirname ( configPath );

  },

  /* CONFIG */

  getConfigPath () {

    if ( !argv.config ) return;

    const config = environment.getConfigObjJSON ();

    if ( _.isPlainObject ( config ) ) return;

    return path.isAbsolute ( argv.config ) ? argv.config : path.resolve ( process.cwd (), argv.config );

  },

  getConfigObjJSON () {

    if ( !argv.config ) return;

    const config = _.attempt ( JSON.parse, argv.config );

    return _.isError ( config ) ? undefined : config;

  },

  getConfigObj () {

    if ( !argv.config ) return;

    return environment.getConfigObjJSON () || file.load ( environment.getConfigPath () );

  },

  getDynamicConfigObj () {

    const src = argv.source || argv.src || argv.s,
          dist = argv.distribution || argv.destination || argv.dist || argv.dest || argv.dst || argv.d,
          environment = argv.environments || argv.environment || argv.envs || argv.env || argv.e;

    return {
      environment,
      paths: {
        tokens: { src, dist }
      }
    };

  },

  /* PROJECT */

  getProjectHash ( project ) { // Uniquely identifies src and environment

    const gulpCwd = environment.getGulpCwd (),
          src = _.castArray ( project.paths.tokens.src ),
          srcAbs = src.map ( src => path.isAbsolute ( src ) ? src : path.resolve ( gulpCwd, src ) ),
          id = `${srcAbs.join ( '|' )}|${project.paths.tokens.environment}`,
          hash = sha1 ( id );

    return hash;

  }

};

/* EXPORT */

module.exports = environment;
