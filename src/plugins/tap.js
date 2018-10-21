
//TODO: Publish as `gulp-tap` or something

/* REQUIRE */

const forAll = require ( './forall' );

/* TAP */

function tap ( files, handler ) {

  files.forEach ( handler );

}

/* EXPORT */

module.exports = forAll ( tap );
