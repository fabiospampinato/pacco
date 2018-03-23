
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildFunctions = require ( '../../../build/scss/parts/functions' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.functions' ), buildFunctions );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-functions', 'Watch SCSS functions', 'all' );
