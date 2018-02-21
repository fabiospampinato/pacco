
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
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
      components = require ( '../../plugins/components' ),
      dependencies = require ( '../../plugins/dependencies' ),
      substitute = require ( '../../plugins/substitute' );
      project = require ( '../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'dependencies', 'substitute', 'jsonminify' );

  return gulp.src ( input.getPath ( 'json' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'json' ) ) ) )
             .pipe ( gulpif ( plugins.jsonminify.enabled, jsonminify ( plugins.jsonminify.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'json' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-json', 'Build JSON', 'more' );
