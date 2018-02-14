
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'javascript' ), plugins.del.options );

}

task.description = '[ALL] Clean generated javascript';

/* GULP */

gulp.task ( 'clean-javascript', task );
