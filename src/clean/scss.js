
/* REQUIRE */

const del     = require ( 'del' ),
      gulp    = require ( 'gulp' ),
      plugins = require ( '../config' ).plugins,
      output  = require ( '../utilities/paths/output' );

/* TASK */

function task () {

  return del ( output.getDirs ( 'scss' ), plugins.del.options );

}

task.description = '[ALL] Clean generated scss';

/* GULP */

gulp.task ( 'clean-scss', task );
