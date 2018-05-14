
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
      wrapper = require ( '../../plugins/wrapper' ),
      project = require ( '../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'concat', 'substitute', 'dependencies', 'babel', 'babili', 'uglify', 'closure', 'webpack' ),
        needOutputPartial = output.isEnabled ( 'javascript.partial' ),
        needOutputUnminified = output.isEnabled ( 'javascript.unminified' ),
        needOutputMinified = output.isEnabled ( 'javascript.minified' );

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
             .pipe ( gulpif ( !needUpdate && needOutputMinified, () => newer ( output.getPath ( 'javascript.minified' ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( concat ( 'partial.js', plugins.concat.options ) )
             .pipe ( gulpif ( needOutputPartial, rename ( output.getName ( 'javascript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputPartial, () => gulp.dest ( output.getDir ( 'javascript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputPartial, touch () ) )
             .pipe ( gulpif ( plugins.webpack.enabled, () => require ( 'webpack-stream' )( plugins.webpack.options ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, () => require ( 'gulp-babel' )( plugins.babel.options ) ) )
             .pipe ( gulpif ( needOutputUnminified, rename ( output.getName ( 'javascript.unminified' ) ) ) )
             .pipe ( wrapper.wrap ( _.merge ( {}, plugins.wrapper.options, { template: 'unminified' } ) ) )
             .pipe ( gulpif ( needOutputUnminified, () => gulp.dest ( output.getDir ( 'javascript.unminified' ) ) ) )
             .pipe ( wrapper.unwrap ( plugins.wrapper.options ) )
             .pipe ( gulpif ( needOutputUnminified, touch () ) )
             .pipe ( gulpif ( plugins.babili.enabled, () => require ( 'gulp-babili' )( plugins.babili.options ) ) )
             .pipe ( gulpif ( plugins.uglify.enabled, () => require ( 'gulp-uglify/composer' )( require ( 'uglify-js'), console )( plugins.uglify.options ) ) )
             .pipe ( gulpif ( plugins.closure.enabled, () => require ( 'google-closure-compiler-js' ).gulp ()( plugins.closure.options ) ) )
             .pipe ( gulpif ( needOutputMinified, rename ( output.getName ( 'javascript.minified' ) ) ) )
             .pipe ( wrapper.wrap ( _.merge ( {}, plugins.wrapper.options, { template: 'minified' } ) ) )
             .pipe ( gulpif ( needOutputMinified, () => gulp.dest ( output.getDir ( 'javascript.minified' ) ) ) )
             .pipe ( wrapper.unwrap ( plugins.wrapper.options ) )
             .pipe ( gulpif ( needOutputMinified, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-javascript', 'Build JavaScript', 'more' );
