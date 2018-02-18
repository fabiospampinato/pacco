
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      gutil = require ( './gutil' );

/* PROJECT */

const project = {

  getHash ( project ) { // Uniquely identifies a `paths.tokens.src` and `environment` combination

    const gulpCwd = gutil.cwd (),
          src = _.castArray ( project.paths.tokens.src ),
          srcAbs = src.map ( src => path.isAbsolute ( src ) ? src : path.resolve ( gulpCwd, src ) ),
          id = `${srcAbs.join ( '|' )}|${project.paths.tokens.environment}`,
          hash = sha1 ( id );

    return hash;

  }

};

/* EXPORT */

module.exports = project;
