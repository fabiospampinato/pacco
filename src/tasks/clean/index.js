
/* REQUIRE */

const del = require ( 'del' ),
      plugins = require ( '../../project' ).plugins,
      clean = require ( '../../utilities/paths/clean' ),
      gutil = require ( '../../utilities/gulp' );

/* TASK */

function task () {

  return del ( clean.getPath (), plugins.del.options );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'clean', 'Clean generated files' );
