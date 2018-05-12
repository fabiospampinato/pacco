
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      output = require ( '../../utilities/paths/output' ),
      plumberU = require ( '../../utilities/plumber' ),
      components = require ( '../../plugins/components' ),
      concat = require ( '../../plugins/concat' ),
      dependencies = require ( '../../plugins/dependencies' ),
      substitute = require ( '../../plugins/substitute' ),
      touch = require ( '../../plugins/touch' ),
      project = require ( '../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'concat', 'substitute', 'dependencies', 'babel', 'babili', 'uglify', 'closure', 'webpack' );

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.minified' ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( concat ( output.getName ( 'javascript.partial' ), plugins.concat.options ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.partial' ) ) )
             .pipe ( touch () )
             .pipe ( gulpif ( plugins.webpack.enabled, () => require ( 'webpack-stream' )( plugins.webpack.options ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, () => require ( 'gulp-babel' )( plugins.babel.options ) ) )
             .pipe ( rename ( output.getName ( 'javascript.unminified' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.unminified' ) ) )
             .pipe ( touch () )
             .pipe ( gulpif ( plugins.babili.enabled, () => require ( 'gulp-babili' )( plugins.babili.options ) ) )
             .pipe ( gulpif ( plugins.uglify.enabled, () => require ( 'gulp-uglify/composer' )( require ( 'uglify-js'), console )( plugins.uglify.options ) ) )
             .pipe ( gulpif ( plugins.closure.enabled, () => require ( 'google-closure-compiler-js' ).gulp ()( plugins.closure.options ) ) )
             .pipe ( rename ( output.getName ( 'javascript.minified' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.minified' ) ) )
             .pipe ( touch () );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-javascript', 'Build JavaScript', 'more' );
