
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      gutil = require ( '../../utilities/gulp' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'css' ), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'clean-css', 'Clean generated css', 'more' );
