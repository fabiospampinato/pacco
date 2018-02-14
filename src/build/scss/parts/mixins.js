
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'mixins', false );

task.description = '[ALL] Build scss mixins';

/* GULP */

gulp.task ( 'build-scss-mixins', task );
