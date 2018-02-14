
/* REQUIRE */

const gulp   = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer  = require ( 'gulp-newer' ),
      touch  = require ( 'gulp-touch-cmd' ),
      output = require ( '../../utilities/paths/output' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'];

  return gulp.src ( parts.map ( part => output.getPath ( `scss.${part}` ) ), { allowEmpty: true } )
             .pipe ( newer ( output.getPath ( 'scss.all' ) ) )
             .pipe ( concat ( output.getName ( 'scss.all' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'scss.all' ) ) )
             .pipe ( touch () );

}

task.description = '[ALL] Build scss';

/* GULP */

gulp.task ( 'build-scss', task );
