
/* REQUIRE */

const _ = require ( 'lodash' ),
      gulp = require ( 'gulp' ),
      gulpif = require ( 'gulp-if' ),
      newer = require ( 'gulp-newer' ),
      rename = require ( 'gulp-rename' ),
      plugins = require ( '../../../project' ).plugins,
      gutil = require ( '../../../utilities/gutil' ),
      output = require ( '../../../utilities/paths/output' ),
      concat = require ( '../../../plugins/concat' ),
      touch = require ( '../../../plugins/touch' );

/* TASK */

function task () {

  const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'],
        needOutput = output.isEnabled ( 'scss.all' );

  return gulp.src ( _.filter ( parts.map ( part => output.getPath ( `scss.${part}` ) ) ), { allowEmpty: true } )
             .pipe ( gulpif ( needOutput, () => newer ( output.getPath ( 'scss.all' ) ) ) )
             .pipe ( concat ( 'all.scss', plugins.concat.options ) )
             .pipe ( gulpif ( needOutput, rename ( output.getName ( 'scss.all' ) ) ) )
             .pipe ( gulpif ( needOutput, () => gulp.dest ( output.getDir ( 'scss.all' ) ) ) )
             .pipe ( gulpif ( needOutput, touch () ) );

}

/* EXPORT */

module.exports = gutil.task.enhance ( task, 'build-scss', 'Build SCSS', 'more' );
