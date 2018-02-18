
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'css' ), plugins.del.options );

}

task.displayName = 'clean-css';
task.description = 'Clean generated css';
task.group = 'more';

/* EXPORT */

module.exports = task;
