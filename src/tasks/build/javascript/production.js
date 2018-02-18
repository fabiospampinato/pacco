
/* REQUIRE */

const gulp = require ( 'gulp' ),
      babel = require ( 'gulp-babel' ),
      babili = require ( 'gulp-babili' ),
      closure = require ( 'google-closure-compiler-js' ).gulp (),
      concat = require ( 'gulp-concat' ),
      flatten = require ( 'gulp-flatten' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      replace = require ( 'gulp-replace' ),
      touch = require ( 'gulp-touch-cmd' ),
      uglify = require ( 'gulp-uglify' ),
      changed = require ( '../../../utilities/changed' ),
      environments = require ( '../../../utilities/environments' ),
      gutil = require ( '../../../utilities/gulp' ),
      input = require ( '../../../utilities/paths/input' ),
      log = require ( '../../../utilities/log' ),
      output = require ( '../../../utilities/paths/output' ),
      dependencies = require ( '../../../plugins/dependencies' ),
      extend = require ( '../../../plugins/extend' ),
      filter = require ( '../../../plugins/filter' ),
      override = require ( '../../../plugins/override' ),
      substitute = require ( '../../../plugins/substitute' ),
      project = require ( '../../../project' ),
      plugins      = project.plugins;

/* TASK */

function task () {

  const needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'override', 'substitute', 'dependencies', 'extend', 'babel', 'babili', 'uglify', 'closure' );

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.uncompressed' ) ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( project, plugins.substitute.options ) ) )
             .pipe ( flatten () )
             .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.babili.enabled, babili ( plugins.babili.options ) ) )
             .pipe ( gulpif ( plugins.uglify.enabled, uglify ( plugins.uglify.options ) ) )
             .pipe ( gulpif ( plugins.closure.enabled, closure ( plugins.closure.options ) ) )
             .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'build-javascript-production', 'Build production JavaScript', 'all' );
