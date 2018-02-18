
/* REQUIRE */

const gulp = require ( 'gulp' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      rename = require ( 'gulp-rename' ),
      replace = require ( 'gulp-replace' ),
      touch = require ( 'gulp-touch-cmd' ),
      environments = require ( '../../../utilities/environments' ),
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

task.displayName = 'build-javascript-development';
task.description = 'Build development javascript';
task.group = 'all';

/* EXPORT */

module.exports = task;
