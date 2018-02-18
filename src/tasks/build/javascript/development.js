
/* REQUIRE */

const gulp = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      rename = require ( 'gulp-rename' ),
      replace = require ( 'gulp-replace' ),
      touch = require ( 'gulp-touch-cmd' ),
      environments = require ( '../../../utilities/environments' ),
      gutil = require ( '../../../utilities/gulp' ),
      input = require ( '../../../utilities/paths/input' ),
      output = require ( '../../../utilities/paths/output' ),
      project = require ( '../../../project' );

/* TASK */

function task () {

  return gulp.src ( input.getPath ( 'javascript.temp' ) )
             .pipe ( newer ( output.getPath ( 'javascript.uncompressed' ) ) )
             .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
             .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'build-javascript-development', 'Build development JavaScript', 'all' );
