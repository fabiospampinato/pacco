
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      gutil = require ( '../../utilities/gutil' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'typescript' ), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'clean-typescript', 'Clean generated TypeScript', 'more' );
