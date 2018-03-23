
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildVariables = require ( '../../../build/scss/parts/variables' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.variables' ), buildVariables );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-variables', 'Watch SCSS variables', 'all' );
