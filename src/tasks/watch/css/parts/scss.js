
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../../utilities/gutil' ),
      output = require ( '../../../../utilities/paths/output' ),
      buildPartSCSS = require ( '../../../build/css/parts/scss' );

/* TASK */

function task () {

  return gulp.watch ( output.getPath ( 'scss.all' ), { interval: 500, usePolling: false }, buildPartSCSS );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-css-scss', 'Watch CSS SCSS', 'all' );
