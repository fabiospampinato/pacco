
/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.series ( 'build', 'watch' );

task.description = 'Build and watch';

/* GULP */

gulp.task ( 'default', task );
