
//TODO: Publish as `gulp-order-pinner`

/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      forAll = require ( './forall' );

/* ORDER PINNER */

function orderPinner ( files ) {

  files.forEach ( ( file, i ) => {

    const dir = path.dirname ( file.path ),
          name = path.basename ( file.path ),
          namePadded = `${_.padStart ( i + 1, files.length.toString ().length, 0 )}-${name}`;

    file.path = path.join ( dir, namePadded );

  });

}

/* EXPORT */

module.exports = forAll ( orderPinner );
