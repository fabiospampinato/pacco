
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      bytediff = require ( 'gulp-bytediff' ),
      flatten = require ( 'gulp-flatten' ),
      gulpif = require ( 'gulp-if' ),
      imagemin = require ( 'gulp-imagemin' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      log = require ( '../../utilities/log' ),
      output = require ( '../../utilities/paths/output' ),
      components = require ( '../../plugins/components' ),
      dependencies = require ( '../../plugins/dependencies' ),
      project = require ( '../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'dependencies', 'imagemin' );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( plumber ( log.pluginError ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.plugins, plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getDir ( 'images' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-images', 'Build images', 'more' );
