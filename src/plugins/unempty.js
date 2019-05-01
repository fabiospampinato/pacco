
//TODO: Publish as `gulp-unempty`

// It adds an empty file to the stream if it doesn't contain any files

/* REQUIRE */

const fs = require ( 'fs' ),
      Vinyl = require ( 'vinyl' ),
      forAll = require ( './forall' );

/* HELPERS */

function getStats () {

  const now = new Date (),
        stats = new fs.Stats ();

  stats.atimeMs = stats.mtimeMs = stats.ctimeMs = stats.birthtimeMs = now.getTime ();
  stats.atime = stats.mtime = stats.ctime = stats.birthtime = now;

  return stats;

}

/* UNEMPTY */

function unempty ( files, filePath ) {

  if ( files.length ) return files;

  if ( filePath && ( !fs.existsSync ( filePath ) || !fs.readFileSync ( filePath, { encoding: 'utf8' } ) ) ) return; // Unempty only if this file is present and is not already empty

  return new Vinyl ({
    contents: Buffer.from ( '' ),
    path: `/tmp/unempty_${Math.random ()}`,
    stat: getStats ()
  });

}

/* EXPORT */

module.exports = forAll ( unempty );
