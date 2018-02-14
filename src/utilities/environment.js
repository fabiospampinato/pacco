
/* REQUIRE */

const _    = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      path = require ( 'path' ),
      file = require ( './file' );

/* ENVIRONMENT */

const environment = {

  /* CWD */

  getShellCwd () {

    return argv.shellCwd || process.cwd ();

  },

  getGulpCwd () {

    const configPath = environment.getConfigPath ();

    if ( !configPath ) return environment.getShellCwd ();

    return path.dirname ( configPath );

  },

  /* CONFIG */

  getConfigPath () {

    if ( !argv.config ) return;

    const config = environment.getConfigObjJSON ();

    if ( _.isPlainObject ( config ) ) return;

    return path.isAbsolute ( argv.config ) ? argv.config : path.resolve ( environment.getShellCwd (), argv.config );

  },

  getConfigObjJSON () {

    if ( !argv.config ) return;

    const config = _.attempt ( JSON.parse, argv.config );

    return _.isError ( config ) ? undefined : config;

  },

  getConfigObj () {

    if ( !argv.config ) return;

    return environment.getConfigObjJSON () || file.load ( environment.getConfigPath () );

  }

};

/* EXPORT */

module.exports = environment;
