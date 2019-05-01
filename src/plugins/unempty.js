
//TODO: Publish as `gulp-unempty`

// It adds an empty file to the stream if it doesn't contain any files

/* REQUIRE */

const fs = require ( 'fs' ),
      Vinyl = require ( 'vinyl' ),
      forAll = require ( './forall' );

/* UNEMPTY */

function unempty ( files, filePath ) {

  if ( files.length ) return files;

  if ( filePath && !fs.existsSync ( filePath ) ) return; // Unempty only if this file is present

  return new Vinyl ({
    path: `/tmp/unempty_${Math.random ()}`,
    contents: Buffer.from ( '' )
  });

}

/* EXPORT */

module.exports = forAll ( unempty );
