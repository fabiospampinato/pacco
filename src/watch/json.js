
/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'json' ), gulp.task ( 'build-json' ) );

}

task.description = '[ALL] Watch json';

/* GULP */

gulp.task ( 'watch-json', task );
