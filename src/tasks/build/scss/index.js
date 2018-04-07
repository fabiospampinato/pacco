
/* REQUIRE */

const gulp = require ( 'gulp' ),
      newer = require ( 'gulp-newer' ),
      plugins = require ( '../../../project' ).plugins,
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      concat = require ( '../../../plugins/concat' ),
      touch = require ( '../../../plugins/touch' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.src ( parts.map ( part => output.getPath ( `scss.${part}` ) ), { allowEmpty: true } )
             .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
             .pipe ( concat ( output.getName ( 'scss.all' ), plugins.concat.options ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss', 'Build SCSS', 'more' );
