
/* REQUIRE */

const gulp = require ( 'gulp' ),
      buildJSON = require ( './json' ),
      buildFonts = require ( './fonts' ),
      buildImages = require ( './images' ),
      buildJavascript = require ( './javascript' ),
      buildStyle = require ( './style' ),
      notify = require ( './notify' );

/* TASK */

const task = gulp.series ( gulp.parallel ( buildJSON, buildFonts, buildImages, buildJavascript, buildStyle ), notify );

task.displayName = 'build';
task.description = 'Build your project';

/* EXPORT */

module.exports = task;
