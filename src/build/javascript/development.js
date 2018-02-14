
/* REQUIRE */

const gulp         = require ( 'gulp' ),
      concat       = require ( 'gulp-concat' ),
      newer        = require ( 'gulp-newer' ),
      rename       = require ( 'gulp-rename' ),
      replace      = require ( 'gulp-replace' ),
      touch        = require ( 'gulp-touch-cmd' ),
      environments = require ( '../../utilities/environments' ),
      input        = require ( '../../utilities/paths/input' ),
      output       = require ( '../../utilities/paths/output' ),
      project      = require ( '../../config' );

/* TASK */

function task () {

  return gulp.src ( input.getPath ( 'javascript.temp' ) )
             .pipe ( newer ( output.getPath ( 'javascript.uncompressed' ) ) )
             .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
            //  .pipe ( replace ( /ENVIRONMENT: '(.*)'/, `ENVIRONMENT: '${environments.pretty ( project.environment )}'` ) ) //TODO: Write a plugin for this
            //  .pipe ( replace ( /DEVELOPMENT: (.*),/, `DEVELOPMENT: ${!!project.isDevelopment},` ) ) //TODO: Write a plugin for this
             .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
             .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) )
             .pipe ( touch () );

}

task.description = '[ALL] Build development javascript';

/* GULP */

gulp.task ( 'build-javascript-development', task );
