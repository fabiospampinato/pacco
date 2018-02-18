
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      gutil = require ( '../../utilities/gulp' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'images' ), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'clean-images', 'Clean generated images', 'more' );
