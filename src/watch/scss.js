
/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.all' ), gulp.task ( 'build-style' ) );

}

task.description = '[ALL] Watch scss';

/* GULP */

gulp.task ( 'watch-scss', task );
