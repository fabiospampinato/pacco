
/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'javascript.all' ), gulp.task ( 'build-javascript' ) );

}

task.description = '[ALL] Watch javascript';

/* GULP */

gulp.task ( 'watch-javascript', task );
