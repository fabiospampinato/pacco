
/* REQUIRE */

const gulp = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      touch = require ( '../../../plugins/touch' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.src ( parts.map ( part => output.getPath ( `scss.${part}` ) ), { allowEmpty: true } )
             .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
             .pipe ( concat ( output.getName ( 'scss.all' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss', 'Build SCSS', 'more' );
