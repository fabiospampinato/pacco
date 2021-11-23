
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildPartCSS = require ( '../../../build/css/parts/css' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'css.all' ), { interval: 500, usePolling: false }, buildPartCSS );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-css-css', 'Watch CSS CSS', 'all' );
