
/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.series ( 'build-scss-parts', 'build-scss', 'build-css' );

task.description = '[ALL] Build scss and css';

/* GULP */

gulp.task ( 'build-style', task );
