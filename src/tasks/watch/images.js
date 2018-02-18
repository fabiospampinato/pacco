
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildImages = require ( '../build/images' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'images' ), buildImages );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'watch-images', 'Watch images', 'more' );
