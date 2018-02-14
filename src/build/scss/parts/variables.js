
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'variables', false );

task.description = '[ALL] Build scss variables';

/* GULP */

gulp.task ( 'build-scss-variables', task );
