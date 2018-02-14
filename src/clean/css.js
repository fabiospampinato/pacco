
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'css' ), plugins.del.options );

}

task.description = '[ALL] Clean generated css';

/* GULP */

gulp.task ( 'clean-css', task );
