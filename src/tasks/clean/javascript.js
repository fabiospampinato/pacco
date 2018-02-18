
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      gutil = require ( '../../utilities/gutil' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'javascript' ), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'clean-javascript', 'Clean generated JavaScript', 'more' );
