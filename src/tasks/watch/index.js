
/* REQUIRE */

const gulp = require ( 'gulp' ),
      watchJSON = require ( './json' ),
      watchFonts = require ( './fonts' ),
      watchImages = require ( './images' ),
      watchJavascript = require ( './javascript' ),
      watchSCSS = require ( './scss' );

/* TASK */

const task = gulp.parallel ( watchJSON, watchFonts, watchImages, watchJavascript, watchSCSS );

task.displayName = 'watch';
task.description = 'Watch files for changes and rebuild';

/* EXPORT */

module.exports = task;
