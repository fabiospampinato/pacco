
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildKeyframes = require ( '../../../build/scss/parts/keyframes' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.keyframes' ), buildKeyframes );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-keyframes', 'Watch SCSS keyframes', 'all' );
