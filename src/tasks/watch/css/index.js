
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      buildCSS = require ( '../../build/css' );

/* TASK */

function task () {

  return gulp.watch ( [output.getPath ( 'css.partial' ), output.getPath ( 'scss.partial' )], buildCSS );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-css', 'Watch CSS', 'more' );
