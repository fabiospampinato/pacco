
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildImages = require ( '../build/images' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'images' ), buildImages );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-images', 'Watch images', 'more' );
