
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      watchJSON = require ( './json' ),
      watchFonts = require ( './fonts' ),
      watchImages = require ( './images' ),
      watchJavascript = require ( './javascript' ),
      watchSCSS = require ( './scss' );

/* TASK */

const task = gulp.parallel ( watchJSON, watchFonts, watchImages, watchJavascript, watchSCSS );

/* EXPORT */

module.exports = gutil.logger ( task, 'watch', 'Watch files for changes and rebuild' );
