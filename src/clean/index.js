
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      clean   = require ( '../utilities/paths/clean' );

/* TASK */

function task () {

  return del ( clean.getPath (), plugins.del.options );

}

task.description = '[ALL] Clean generated files';

/* GULP */

gulp.task ( 'clean', task );
