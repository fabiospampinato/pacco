
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      project = require ( '../../../../project' ),
      {plugins} = project,
      changed = require ( '../../../../utilities/changed' ),
      input = require ( '../../../../utilities/paths/input' ),
      output = require ( '../../../../utilities/paths/output' ),
      plumberU = require ( '../../../../utilities/plumber' ),
      components = require ( '../../../../plugins/components' ),
      concat = require ( '../../../../plugins/concat' ),
      dependencies = require ( '../../../../plugins/dependencies' ),
      substitute = require ( '../../../../plugins/substitute' ),
      touch = require ( '../../../../plugins/touch' ),
      unempty = require ( '../../../../plugins/unempty' );

/* GENERAL */

function general ( name, filterable ) {

  const needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'concat', 'substitute', 'dependencies' ),
        needOutput = output.isEnabled ( `scss.${name}` );

  return gulp.src ( input.getPath ( `scss.${name}` ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( filterable && plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( unempty ( output.getPath ( `scss.${name}` ) ) )
             .pipe ( gulpif ( !needUpdate && needOutput, () => newer ( output.getPath ( `scss.${name}` ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( concat ( `${name}.scss`, plugins.concat.options ) )
             .pipe ( gulpif ( needOutput, rename ( output.getName ( `scss.${name}` ) ) ) )
             .pipe ( gulpif ( needOutput, () => gulp.dest ( output.getDir ( `scss.${name}` ) ) ) )
             .pipe ( gulpif ( needOutput, touch () ) );

}

/* EXPORT */

module.exports = general;
