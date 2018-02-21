
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      flatten = require ( 'gulp-flatten' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' )
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      log = require ( '../../utilities/log' ),
      output = require ( '../../utilities/paths/output' ),
      project = require ( '../../project' ),
      {plugins} = project,
      components = require ( '../../plugins/components' ),
      dependencies = require ( '../../plugins/dependencies' );

/* TASK */

function task () {

  const needUpdate = changed.plugin ( 'dependencies' );

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( plumber ( log.pluginError ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'fonts' ) ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'fonts' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-fonts', 'Build fonts', 'more' );
