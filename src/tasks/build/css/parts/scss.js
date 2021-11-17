
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      plumber = require ( 'gulp-plumber' ),
      rename = require ( 'gulp-rename' ),
      changed = require ( '../../../../utilities/changed' ),
      output = require ( '../../../../utilities/paths/output' ),
      plumberU = require ( '../../../../utilities/plumber' ),
      touch = require ( '../../../../plugins/touch' ),
      plugins = require ( '../../../../project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.environment () || changed.target () || changed.plugins ( 'sass' ),
        needOutput = output.isEnabled ( 'scss.partial' );

  return gulp.src ( output.getPath ( 'scss.all' ), { allowEmpty: true } )
             .pipe ( plumber ( plumberU.error ) )
             .pipe ( gulpif ( !needUpdate && needOutput, () => newer ( output.getPath ( 'scss.partial' ) ) ) )
             .pipe ( gulpif ( plugins.sass.enabled, () => require ( 'gulp-sass' )( require ( 'node-sass' ) )( plugins.sass.options ) ) )
             .pipe ( gulpif ( needOutput, rename ( output.getName ( 'scss.partial' ) ) ) )
             .pipe ( gulpif ( needOutput, () => gulp.dest ( output.getDir ( 'scss.partial' ) ) ) )
             .pipe ( gulpif ( needOutput, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-css-scss', 'Build CSS SCSS', 'all' );
