
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      changed = require ( '../../../../utilities/changed' ),
      output = require ( '../../../../utilities/paths/output' ),
      plumberU = require ( '../../../../utilities/plumber' ),
      components = require ( '../../../../plugins/components' ),
      concat = require ( '../../../../plugins/concat' ),
      dependencies = require ( '../../../../plugins/dependencies' ),
      substitute = require ( '../../../../plugins/substitute' ),
      touch = require ( '../../../../plugins/touch' ),
      project = require ( '../../../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'concat', 'substitute', 'dependencies' ),
        needOutput = output.isEnabled ( 'css.partial' );

  return gulp.src ( input.getPath ( 'css.all' ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( !needUpdate && needOutput, () => newer ( output.getPath ( 'css.partial' ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( concat ( output.getName ( 'css.partial' ), plugins.concat.options ) )
             .pipe ( gulpif ( needOutput, () => gulp.dest ( output.getDir ( 'css.partial' ) ) ) )
             .pipe ( gulpif ( needOutput, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css-css', 'Build CSS CSS', 'all' );
