
/* REQUIRE */

const _ = require ( 'lodash' ),
      {argv} = require ( 'yargs' ),
      diff = require ( 'test-diff' ),
      execa = require ( 'execa' ),
      path = require ( 'path' );

/* VARIABLES */

const PACCO = path.resolve ( __dirname, '..', 'bin', 'index.js' ),
      CHECK = path.join ( __dirname, 'check' ),
      CONFIG = path.join ( __dirname, 'config' ),
      OUTPUT = path.join ( __dirname, 'dist' ),
      SOURCE = path.join ( __dirname, 'src' ),
      GLOB = argv.only ? `${argv.only}{}` : '*';

/* TEST */

const Test = {

  config: {

    getGeneral ( test ) {

      const escapeBackslash = filePath => filePath.replace ( /\\/g, '\\\\' ), // Required for properly handling Windows paths
            {source, output} = Test.paths.get ( test ),
            configBase = Test.config.getSpecific ( 'general' ),
            config = JSON.parse ( JSON.stringify ( configBase ).replace ( '[src]', escapeBackslash ( source ) ).replace ( '[dist]', escapeBackslash ( output ) ) );

      return config;

    },

    getSpecific ( test ) {

      try {

        return require ( Test.paths.get ( test ).config );

      } catch ( e ) {

        return {};

      }

    },

    get ( test ) {

      const general = Test.config.getGeneral ( test ),
            specific = Test.config.getSpecific ( test ),
            config = _.merge ( general, specific );

      return config;

    }

  },

  paths: {

    get ( test ) {

      return {
        config: path.join ( CONFIG, `${test}.json` ),
        source: path.join ( SOURCE, test ),
        output: path.join ( OUTPUT, test ),
        check: path.join ( CHECK, test )
      };

    }

  },

  make ( test ) {

    const config = Test.config.get ( test ),
          result = execa ( PACCO, ['build', '--config', JSON.stringify ( config ), '--no-notification', '--fresh', '--verbose', ...argv._], { reject: false } );

    return result;

  }

};

/* DIFF */

diff ({
  verbose: !!argv.verbose,
  source: {
    cwd: SOURCE,
    glob: GLOB
  },
  output: {
    cwd: OUTPUT,
    make: Test.make
  },
  check: {
    cwd: CHECK,
    glob: GLOB
  }
});
