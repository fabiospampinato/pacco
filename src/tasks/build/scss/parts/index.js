
/* REQUIRE */

const gulp = require ( 'gulp' ),
      buildFunctions = require ( './functions' ),
      buildMixins = require ( './mixins' ),
      buildVariables = require ( './variables' ),
      buildKeyframes = require ( './keyframes' ),
      buildStyle = require ( './style' );

/* TASK */

const task = gulp.series ( buildFunctions, buildMixins, buildVariables, buildKeyframes, buildStyle );

task.displayName = 'build-scss-parts';
task.description = 'Build scss parts';
task.group = 'all';

/* EXPORT */

module.exports = task;
