
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildStyle = require ( '../../../build/scss/parts/style' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.style' ), { interval: 500, usePolling: false }, buildStyle );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-style', 'Watch SCSS style', 'all' );
