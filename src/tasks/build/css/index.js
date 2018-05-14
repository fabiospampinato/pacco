
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      changed = require ( '../../../utilities/changed' ),
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      plumberU = require ( '../../../utilities/plumber' ),
      concat = require ( '../../../plugins/concat' ),
      touch = require ( '../../../plugins/touch' ),
      plugins = require ( '../../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.plugins ( 'autoprefixer', 'concat', 'postcss' ),
        needOutputUnminified = output.isEnabled ( 'css.unminified' ),
        needOutputMinified = output.isEnabled ( 'css.minified' );

  return gulp.src ( _.filter ([ output.getPath ( 'css.partial' ), output.getPath ( 'scss.partial' ) ]), { allowEmpty: true } )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( !needUpdate && needOutputMinified, () => newer ( output.getPath ( 'css.minified' ) ) ) )
             .pipe ( concat ( 'unminified.css', plugins.concat.options ) )
             .pipe ( gulpif ( needOutputUnminified, rename ( output.getName ( 'css.unminified' ) ) ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, () => require ( 'gulp-autoprefixer' )( plugins.autoprefixer.options ) ) )
             .pipe ( gulpif ( needOutputUnminified, () => gulp.dest ( output.getDir ( 'css.unminified' ) ) ) )
             .pipe ( gulpif ( needOutputUnminified, touch () ) )
             .pipe ( gulpif ( plugins.postcss.enabled, () => require ( 'gulp-postcss' )( plugins.postcss.plugins (), plugins.postcss.options ) ) )
             .pipe ( gulpif ( needOutputMinified, rename ( output.getName ( 'css.minified' ) ) ) )
             .pipe ( gulpif ( needOutputMinified, () => gulp.dest ( output.getDir ( 'css.minified' ) ) ) )
             .pipe ( gulpif ( needOutputMinified, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css', 'Build CSS', 'more' );
