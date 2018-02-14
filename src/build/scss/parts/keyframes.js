
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'keyframes', true );

task.description = '[ALL] Build scss keyframes';

/* GULP */

gulp.task ( 'build-scss-keyframes', task );
