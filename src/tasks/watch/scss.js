
/* REQUIRE */

const gulp = require ( 'gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildStyle = require ( '../build/style' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.all' ), buildStyle );

}

task.displayName = 'watch-scss';
task.description = 'Watch scss';
task.group = 'more';

/* EXPORT */

module.exports = task;
