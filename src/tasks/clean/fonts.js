
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'fonts' ), plugins.del.options );

}

task.displayName = 'clean-fonts';
task.description = 'Clean generated fonts';
task.group = 'more';

/* EXPORT */

module.exports = task;
