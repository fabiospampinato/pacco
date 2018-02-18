
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildStyle = require ( '../build/style' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.all' ), buildStyle );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss', 'Watch SCSS', 'more' );
