
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'style', true );

task.description = '[ALL] Build scss style';

/* GULP */

gulp.task ( 'build-scss-style', task );
