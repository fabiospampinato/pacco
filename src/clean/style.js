
/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

let task = gulp.parallel ( 'clean-scss', 'clean-css' );

task.description = '[ALL] Clean generated style';

/* GULP */

gulp.task ( 'clean-style', task );
