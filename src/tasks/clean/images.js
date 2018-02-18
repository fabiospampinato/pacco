
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'images' ), plugins.del.options );

}

task.displayName = 'clean-images';
task.description = 'Clean generated images';
task.group = 'more';

/* EXPORT */

module.exports = task;
