
//TODO: Publish as `gulp-forall`

/* REQUIRE */

const PluginError = require ( 'plugin-error' ),
      through = require ( 'through2' );

/* FOR ALL */

function forAll ( plugin ) {

  return function pluginWrapper ( ...args ) {

    let files = [];

    return through.obj ( function ( file, encoding, callback ) {

      files.push ( file );

      callback ();

    }, async function ( callback ) {

      files = await plugin ( files, ...args ) || files;

      if ( files instanceof PluginError ) {

        callback ( files );

      } else {

        files.forEach ( this.push.bind ( this ) );

        callback ();

      }

    });

  }

}

/* EXPORT */

module.exports = forAll;
