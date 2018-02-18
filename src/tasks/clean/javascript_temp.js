
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'javascript.temp' ), plugins.del.options );

}

task.displayName = 'clean-javascript-temp';
task.description = 'Clean generated temporary javascript';
task.group = 'all';

/* EXPORT */

module.exports = task;
