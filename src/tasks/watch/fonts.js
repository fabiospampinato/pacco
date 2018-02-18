
/* REQUIRE */

const gulp = require ( 'gulp' ),
      input = require ( '../../utilities/paths/input' ),
      buildFonts = require ( '../build/fonts' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'fonts' ), buildFonts );

}

task.displayName = 'watch-fonts';
task.description = 'Watch fonts';
task.group = 'more';

/* EXPORT */

module.exports = task;
