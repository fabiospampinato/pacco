
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildHTML = require ( '../build/html' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'html' ), buildHTML );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-html', 'Watch HTML', 'more' );
