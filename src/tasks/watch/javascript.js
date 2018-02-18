
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildJavascript = require ( '../build/javascript' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'javascript.all' ), buildJavascript );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'watch-javascript', 'Watch javascript', 'more' );
