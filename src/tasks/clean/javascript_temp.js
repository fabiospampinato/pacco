
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      gutil = require ( '../../utilities/gulp' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDir ( 'javascript.temp' ), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'clean-javascript-temp', 'Clean generated temporary javascript', 'all' );
