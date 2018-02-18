
/* REQUIRE */

const gulp = require ( 'gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildImages = require ( '../build/images' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'images' ), buildImages );

}

task.displayName = 'watch-images';
task.description = 'Watch images';
task.group = 'more';

/* EXPORT */

module.exports = task;
