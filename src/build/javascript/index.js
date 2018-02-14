
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      project = require ( '../../config' );

/* TASK */

const task = project.isDevelopment ? gulp.series ( 'clean-javascript-temp', 'build-javascript-temp', 'build-javascript-development' ) : gulp.task ( 'build-javascript-production' );

task.description = '[ALL] Build javascript';

/* GULP */

gulp.task ( 'build-javascript', task );
