
/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'images' ), gulp.task ( 'build-images' ) );

}

task.description = '[ALL] Watch images';

/* GULP */

gulp.task ( 'watch-images', task );
