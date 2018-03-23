
/* REQUIRE */

const gulp = require ( 'gulp' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      buildSCSS = require ( '../../build/scss' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.watch ( parts.map ( part => output.getPath ( `scss.${part}` ) ), buildSCSS );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'watch-scss', 'Watch SCSS', 'more' );
