
/* REQUIRE */

const gulp = require ( 'gulp' ),
      cleanSCSS = require ( './scss' ),
      cleanCSS = require ( './css' );

/* TASK */

const task = gulp.parallel ( cleanSCSS, cleanCSS );

task.displayName = 'clean-style';
task.description = 'Clean generated scss and css';
task.group = 'more';

/* EXPORT */

module.exports = task;
