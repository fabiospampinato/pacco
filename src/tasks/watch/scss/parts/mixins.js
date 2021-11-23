
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      input = require ( '../../../../utilities/paths/input' ),
      buildMixins = require ( '../../../build/scss/parts/mixins' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.mixins' ), { interval: 500, usePolling: false }, buildMixins );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss-mixins', 'Watch SCSS mixins', 'all' );
