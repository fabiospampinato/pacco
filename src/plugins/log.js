
//TODO: Publish as `gulp-log`

/* REQUIRE */

const _ = require ( 'lodash' ),
      forAll = require ( './forall' );

/* LOG */

function log ( files, txt = _.noop ) {

  txt = _.isFunction ( txt ) ? txt () : txt;

  if ( txt ) console.log ( txt );

}

/* EXPORT */

module.exports = forAll ( log );
