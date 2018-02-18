
/* REQUIRE */

const gulp = require ( 'gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildJavascript = require ( '../build/javascript' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'javascript.all' ), buildJavascript );

}

task.displayName = 'watch-javascript';
task.description = 'Watch javascript';
task.group = 'more';

/* EXPORT */

module.exports = task;
