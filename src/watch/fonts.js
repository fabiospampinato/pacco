
/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'fonts' ), gulp.task ( 'build-fonts' ) );

}

task.description = '[ALL] Watch fonts';

/* GULP */

gulp.task ( 'watch-fonts', task );
