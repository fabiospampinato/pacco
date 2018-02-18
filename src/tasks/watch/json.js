
/* REQUIRE */

const gulp = require ( 'gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildJSON = require ( '../build/json' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'json' ), buildJSON );

}

task.displayName = 'watch-json';
task.description = 'Watch json';
task.group = 'more';

/* EXPORT */

module.exports = task;
