
//TODO: Saving a list of the files order and using it will greatly improve performance in the case where we are adding a new file, so that we won't need to clean the directory and parse all the files again

/* REQUIRE */

const _ = require ( 'lodash' ),
      del = require ( 'del' ),
      path = require ( 'path' ),
      gulp = require ( 'gulp' ),
      babel = require ( 'gulp-babel' ),
      flatten = require ( 'gulp-flatten' ),
      foreach = require ( 'gulp-foreach' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      project = require ( '../../../project' ),
      {plugins} = project,
      changed = require ( '../../../utilities/changed' ),
      gutil = require ( '../../../utilities/gulp' ),
      input = require ( '../../../utilities/paths/input' ),
      log = require ( '../../../utilities/log' ),
      output = require ( '../../../utilities/paths/output' ),
      dependencies = require ( '../../../plugins/dependencies' ),
      extend = require ( '../../../plugins/extend' ),
      filter = require ( '../../../plugins/filter' ),
      orderPinner = require ( '../../../plugins/order_pinner' ),
      override = require ( '../../../plugins/override' ),
      substitute = require ( '../../../plugins/substitute' );

/* TASK */

function task () {

  const needCleaning = changed.project ( 'components' ) || changed.project ( 'output.javascript' ) || changed.plugins ( 'filter', 'override', 'substitute', 'dependencies', 'extend' ),
        needUpdate   = needCleaning || changed.plugin ( 'babel' );

  if ( needCleaning ) {

    del.sync ( output.getPath ( 'javascript.temp' ), plugins.del.options );

  }

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( project, plugins.substitute.options ) ) )
             .pipe ( orderPinner () )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'javascript.temp' ) ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.temp' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.logger ( task, 'build-javascript-temp', 'Build temporary JavaScript', 'all' );
