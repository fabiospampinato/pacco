
/* REQUIRE */

const gulp = require ( 'gulp' )
      gutil = require ( '../../utilities/gulp' ),
      buildSCSSParts = require ( './scss/parts' ),
      buildSCSS = require ( './scss' ),
      buildCSS = require ( './css' );

/* TASK */

const task = gulp.series (  buildSCSSParts, buildSCSS, buildCSS );

/* EXPORT */

module.exports = gutil.logger ( task, 'build-style', 'Build SCSS and CSS', 'more' );
