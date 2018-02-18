
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      buildJSON = require ( './json' ),
      buildFonts = require ( './fonts' ),
      buildImages = require ( './images' ),
      buildJavascript = require ( './javascript' ),
      buildStyle = require ( './style' ),
      notify = require ( './notify' );

/* TASK */

const task = gulp.series ( gulp.parallel ( buildJSON, buildFonts, buildImages, buildJavascript, buildStyle ), notify );

/* EXPORT */

module.exports = gutil.logger ( task, 'build', 'Build your project' );
