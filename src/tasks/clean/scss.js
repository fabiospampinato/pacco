
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'scss' ), plugins.del.options );

}

task.displayName = 'clean-scss';
task.description = 'Clean generated scss';
task.group = 'more';

/* EXPORT */

module.exports = task;
