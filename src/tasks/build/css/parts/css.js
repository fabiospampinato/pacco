
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      changed = require ( '../../../../utilities/changed' ),
      output = require ( '../../../../utilities/paths/output' ),
      plumberU = require ( '../../../../utilities/plumber' ),
      components = require ( '../../../../plugins/components' ),
      dependencies = require ( '../../../../plugins/dependencies' ),
      substitute = require ( '../../../../plugins/substitute' ),
      project = require ( '../../../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'substitute', 'dependencies' );

  return gulp.src ( input.getPath ( 'css.all' ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.partial' ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( concat ( output.getName ( 'css.partial' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.partial' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css-css', 'Build CSS CSS', 'all' );
