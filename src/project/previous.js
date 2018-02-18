
/* REQUIRE */

const path = require ( 'path' ),
      file = require ( '../utilities/file' ),
      projectU = require ( '../utilities/project' ),
      project = require ( '.' );

/* PREVIOUS */

const previousPath = path.join ( projectU.getTempPath ( project ), 'project.previous.json' ),
      previous = file.load ( previousPath, {} );

/* UPDATE */

file.write ( previousPath, project );

/* EXPORT */

module.exports = previous;
