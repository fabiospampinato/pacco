
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      buildJSON = require ( '../build/json' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'json' ), buildJSON );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-json', 'Watch JSON', 'more' );
