
/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'functions', false );

task.description = '[ALL] Build scss functions';

/* GULP */

gulp.task ( 'build-scss-functions', task );
