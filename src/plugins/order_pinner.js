
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      foreach = require ( 'gulp-foreach' );

/* ORDER PINNER */

function orderPinner ( stream, file ) {

  let index = 1;

  return foreach ( ( stream, file ) => {

    const basename = path.basename ( file.path ),
          padded = _.padStart ( index++, 3, 0 ) + '-' + basename;

    file.path = file.path.replace ( basename, padded );

    return stream;

  });

}

/* EXPORT */

module.exports = orderPinner;
