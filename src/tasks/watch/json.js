
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../utilities/gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildJSON = require ( '../build/json' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'json' ), buildJSON );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'watch-json', 'Watch json', 'more' );
