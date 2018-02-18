
/* REQUIRE */

const gulp = require ( 'gulp' ),
      flatten = require ( 'gulp-flatten' ),
      gulpif = require ( 'gulp-if' ),
      jsonminify = require ( 'gulp-jsonminify' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      log = require ( '../../utilities/log' ),
      output = require ( '../../utilities/paths/output' ),
      filter = require ( '../../plugins/filter' ),
      override = require ( '../../plugins/override' ),
      substitute = require ( '../../plugins/substitute' );
      project = require ( '../../project' ),
      {plugins}  = project;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'override', 'substitute', 'jsonminify' );

  return gulp.src ( input.getPath ( 'json' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( project, plugins.substitute.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'json' ) ) ) )
             .pipe ( gulpif ( plugins.jsonminify.enabled, jsonminify ( plugins.jsonminify.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'json' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-json', 'Build JSON', 'more' );
