
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      typescript = require ( 'gulp-typescript' ),
      changed = require ( '../../utilities/changed' ),
      gutil = require ( '../../utilities/gutil' ),
      input = require ( '../../utilities/paths/input' ),
      output = require ( '../../utilities/paths/output' ),
      plumberU = require ( '../../utilities/plumber' ),
      components = require ( '../../plugins/components' ),
      concat = require ( '../../plugins/concat' ),
      dependencies = require ( '../../plugins/dependencies' ),
      pickerFactory = require ( '../../plugins/picker' ),
      substitute = require ( '../../plugins/substitute' ),
      tap = require ( '../../plugins/tap' ),
      touch = require ( '../../plugins/touch' ),
      unempty = require ( '../../plugins/unempty' ),
      wrapper = require ( '../../plugins/wrapper' ),
      project = require ( '../../project' ),
      {plugins} = project;

/* TASK */

function task () {

  const picker = pickerFactory (),
        needUpdate = changed.environment () || changed.target () || changed.project ( 'components' ) || changed.plugins ( 'components', 'concat', 'substitute', 'dependencies', 'babel', 'babili', 'uglify', 'closure', 'typescript', 'webpack', 'wrapper' ),
        needOutputJSPartial = output.isEnabled ( 'javascript.partial' ),
        needOutputJSUnminified = output.isEnabled ( 'javascript.unminified' ),
        needOutputJSMinified = output.isEnabled ( 'javascript.minified' ),
        needOutputTSPartial = output.isEnabled ( 'typescript.partial' ),
        needOutputTSDeclaration = output.isEnabled ( 'typescript.declaration' );

  let isTypeScript = false;

  return gulp.src ( _.flatten ( _.filter ( [input.getPath ( 'javascript.all' ), input.getPath ( 'typescript.all' )] ) ) )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( plugins.components.enabled, components ( _.merge ( { components: project.components }, plugins.components.options ) ) ) )
            //  .pipe ( unempty () ) //TODO
             .pipe ( gulpif ( !needUpdate && needOutputJSMinified, () => newer ( output.getPath ( 'javascript.minified' ) ) ) )
             .pipe ( gulpif ( plugins.substitute.enabled, substitute ( _.merge ( { substitutions: project }, plugins.substitute.options ) ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( tap ( file => isTypeScript = isTypeScript || /\.ts$/.test ( file.path ) ) )
             .pipe ( concat ( () => `partial.${isTypeScript ? 'ts' : 'js'}`, plugins.concat.options ) )
             .pipe ( picker.pick ( () => isTypeScript ) )
             .pipe ( gulpif ( needOutputTSPartial, rename ( output.getName ( 'typescript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputTSPartial, () => gulp.dest ( output.getDir ( 'typescript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputTSPartial, touch () ) )
             .pipe ( gulpif ( plugins.typescript.enabled, typescript ( _.merge ( _.isPlainObject ( plugins.typescript.options ) ? plugins.typescript.options : plugins.typescript.options (), { declaration: true } ) ) ) )
             .pipe ( picker.replace ( ( cached, compiled ) => compiled.length ? compiled : cached ) )
             .pipe ( picker.pick ( '**/*.d.ts' ) )
             .pipe ( gulpif ( needOutputTSDeclaration, rename ( output.getName ( 'typescript.declaration' ) ) ) )
             .pipe ( gulpif ( needOutputTSDeclaration, () => gulp.dest ( output.getDir ( 'typescript.declaration' ) ) ) )
             .pipe ( gulpif ( needOutputTSDeclaration, touch () ) )
             .pipe ( picker.pick ( '**/*.js' ) )
             .pipe ( gulpif ( needOutputJSPartial, rename ( output.getName ( 'javascript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputJSPartial, () => gulp.dest ( output.getDir ( 'javascript.partial' ) ) ) )
             .pipe ( gulpif ( needOutputJSPartial, touch () ) )
             .pipe ( gulpif ( plugins.webpack.enabled, () => require ( 'webpack-stream' )( plugins.webpack.options ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, () => require ( 'gulp-babel' )( plugins.babel.options ) ) )
             .pipe ( gulpif ( needOutputJSUnminified, rename ( output.getName ( 'javascript.unminified' ) ) ) )
             .pipe ( wrapper.wrap ( _.merge ( {}, plugins.wrapper.options, { template: 'unminified' } ) ) )
             .pipe ( gulpif ( needOutputJSUnminified, () => gulp.dest ( output.getDir ( 'javascript.unminified' ) ) ) )
             .pipe ( wrapper.unwrap ( plugins.wrapper.options ) )
             .pipe ( gulpif ( needOutputJSUnminified, touch () ) )
             .pipe ( gulpif ( plugins.babili.enabled, () => require ( 'gulp-babili' )( plugins.babili.options ) ) )
             .pipe ( gulpif ( plugins.uglify.enabled, () => require ( 'gulp-uglify/composer' )( require ( 'uglify-js'), console )( plugins.uglify.options ) ) )
             .pipe ( gulpif ( plugins.closure.enabled, () => require ( 'google-closure-compiler' ).gulp ()( plugins.closure.options ) ) )
             .pipe ( gulpif ( needOutputJSMinified, rename ( output.getName ( 'javascript.minified' ) ) ) )
             .pipe ( wrapper.wrap ( _.merge ( {}, plugins.wrapper.options, { template: 'minified' } ) ) )
             .pipe ( gulpif ( needOutputJSMinified, () => gulp.dest ( output.getDir ( 'javascript.minified' ) ) ) )
             .pipe ( wrapper.unwrap ( plugins.wrapper.options ) )
             .pipe ( gulpif ( needOutputJSMinified, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-javascript', 'Build JavaScript and TypeScript', 'more' );
