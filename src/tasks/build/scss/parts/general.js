
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      concat = require ( 'gulp-concat' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      touch = require ( 'gulp-touch-cmd' ),
      project = require ( '../../../../project' ),
      {plugins} = project,
      changed = require ( '../../../../utilities/changed' ),
      log = require ( '../../../../utilities/log' ),
      input = require ( '../../../../utilities/paths/input' ),
      output = require ( '../../../../utilities/paths/output' ),
      components = require ( '../../../../plugins/components' ),
      dependencies = require ( '../../../../plugins/dependencies' ),
      substitute = require ( '../../../../plugins/substitute' );

/* GENERAL */

function general ( name, filterable ) {

  const needUpdate = changed.project ( 'components' ) || changed.plugins ( 'components', 'substitute', 'dependencies' );

  return gulp.src ( input.getPath ( `scss.${name}` ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( filterable && plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( `scss.${name}` ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( concat ( output.getName ( `scss.${name}` ) ) )
             .pipe ( gulp.dest ( output.getDir ( `scss.${name}` ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = general;
