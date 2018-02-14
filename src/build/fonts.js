
/* REQUIRE */

const gulp     = require ( 'gulp' ),
      gulpif   = require ( 'gulp-if' ),
      flatten  = require ( 'gulp-flatten' ),
      newer    = require ( 'gulp-newer' ),
      plumber  = require ( 'gulp-plumber' )
      touch    = require ( 'gulp-touch-cmd' ),
      changed  = require ( '../utilities/changed' ),
      log      = require ( '../utilities/log' ),
      input    = require ( '../utilities/paths/input' ),
      output   = require ( '../utilities/paths/output' ),
      plugins  = require ( '../config' ).plugins,
      filter   = require ( '../plugins/filter' ),
      override = require ( '../plugins/override' );

/* TASK */

function task () {

  const needUpdate = changed.plugin ( 'override' );

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'fonts' ) ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'fonts' ) ) )
             .pipe ( touch () );

}

task.description = '[ALL] Build fonts';

/* GULP */

gulp.task ( 'build-fonts', task );
