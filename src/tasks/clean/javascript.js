
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'javascript' ), plugins.del.options );

}

task.displayName = 'clean-javascript';
task.description = 'Clean generated javascript';
task.group = 'more';

/* EXPORT */

module.exports = task;
