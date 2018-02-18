
/* REQUIRE */

const _ = require ( 'lodash' ),
      chalk = require ( 'chalk' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      file = require ( './file' ),
      gutil = require ( './gutil' );

/* PROJECT */

const project = {

  getSrcPaths ( config ) {

    const src = _.castArray ( config.paths.tokens.src );

    return src.map ( gutil.abs );

  },

  checkSrcPaths ( config ) {

    const src = project.getSrcPaths ( config ),
          missing = src.filter ( _.negate ( file.exists ) );

    if ( !missing.length ) return;

    console.error ( chalk.red ( `Source path(s) not found:\n  ${missing.map ( m => chalk.underline ( m ) ).join ( '\n  ' )}` ) );

    process.exit ( 1 );

  },

  getDistPath ( config ) {

    return gutil.abs ( config.paths.tokens.dist );

  },

  getTempPath ( config ) { // In order to allow for multiple simultaneous compilations

    return path.resolve ( __dirname, '..', '..', '.temp', project.getHash ( config ) );

  },

  getHash ( config ) { // Uniquely identifies a `paths.tokens.src` and `environment` combination

    const src = project.getSrcPaths ( config ),
          environment = _.castArray ( config.environment ),
          id = `${src.join ( '|' )}|${environment.join ( '|' )}`,
          hash = sha1 ( id );

    return hash;

  }

};

/* EXPORT */

module.exports = project;
