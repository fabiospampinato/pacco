
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      clean = require ( '../../utilities/paths/clean' );

/* TASK */

function task () {

  return del ( clean.getPath (), plugins.del.options );

}

task.displayName = 'clean';
task.description = 'Clean generated files';

/* EXPORT */

module.exports = task;
