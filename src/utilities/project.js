
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      gutil = require ( './gutil' );

/* PROJECT */

const project = {

  getSrcPaths ( config ) {

    const src = _.castArray ( config.paths.tokens.src );

    return src.map ( gutil.abs );

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
