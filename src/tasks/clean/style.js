
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      cleanSCSS = require ( './scss' ),
      cleanCSS = require ( './css' );

/* TASK */

const task = gulp.parallel ( cleanSCSS, cleanCSS );

/* EXPORT */

module.exports = gutil.logger ( task, 'clean-style', 'Clean generated SCSS and CSS', 'more' );
