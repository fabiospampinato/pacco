
/* REQUIRE */

const gulp = require ( 'gulp' ),
      build = require ( './build' ),
      watch = require ( './watch' );

/* TASK */

const task = gulp.series ( build, watch );

task.displayName = 'default';
task.description = 'Build and watch';

/* EXPORT */

module.exports = task;
