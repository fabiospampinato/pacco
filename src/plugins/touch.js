
//TODO: Publish as `gulp-touch`

/* REQUIRE */

const fs = require ( 'fs' ),
      forAll = require ( './forall' );

/* TOUCH */

function touch ( files ) {

  const now = new Date ();

  files.forEach ( file => {

    fs.utimes ( file.path, now, now, () => {} )

  });

}

/* EXPORT */

module.exports = forAll ( touch );
