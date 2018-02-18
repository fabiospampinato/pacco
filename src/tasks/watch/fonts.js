
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildFonts = require ( '../build/fonts' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'fonts' ), buildFonts );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'watch-fonts', 'Watch fonts', 'more' );
