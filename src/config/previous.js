
/* VARIABLES */

const PATH = require ( 'path' ).join ( __dirname, '.project.previous.json' );

/* REQUIRE */

const file     = require ( '../utilities/file' ),
      previous = file.load ( PATH, {} ),
      project  = require ( '.' );

/* UPDATE */

file.write ( PATH, project );

/* EXPORT */

module.exports = previous;
