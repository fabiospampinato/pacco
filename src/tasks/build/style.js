
/* REQUIRE */

const gulp = require ( 'gulp' )
      buildSCSSParts = require ( './scss/parts' ),
      buildSCSS = require ( './scss' ),
      buildCSS = require ( './css' );

/* TASK */

const task = gulp.series (  buildSCSSParts, buildSCSS, buildCSS );

task.displayName = 'build-style';
task.description = 'Build scss and css';
task.group = 'more';

/* EXPORT */

module.exports = task;
