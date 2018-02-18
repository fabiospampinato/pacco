
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'json' ), plugins.del.options );

}

task.displayName = 'clean-json';
task.description = 'Clean generated json';
task.group = 'more';

/* EXPORT */

module.exports = task;
