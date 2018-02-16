
// Generating a custom config for each `test/src/*`
// Building in `test/dist/*`
// Diffing `test/dist/*` against `test/check/*`
// Options:
//   --only testName => run only this test
//   --check         => diff `dist` and `check` directories

/* REQUIRE */

const argv   = require ( 'yargs' ).argv,
      chalk  = require ( 'chalk' ),
      execa  = require ( 'execa' ),
      fs     = require ( 'fs' ),
      globby = require ( 'globby' ),
      mkdirp = require ( 'mkdirp' ),
      path   = require ( 'path' );

/* VARIABLES */

const PACCO_BIN = path.resolve ( __dirname, '../bin/index.js' ),
      TEST_ENV = 'development';

/* HELPERS */

async function getTests () {

  if ( argv.only ) return [argv.only];

  const cwd = path.join ( __dirname, 'src' );

  return await globby ( '*', {
    cwd,
    onlyDirectories: true
  });

}

function getTestPaths ( test ) {

  return {
    src: path.join ( __dirname, `src/${test}` ),
    dist: path.join ( __dirname, `dist/${test}` ),
    check: path.join ( __dirname, `check/${test}` )
  };

}

function getTestConfig ( test ) {

  const {src, dist} = getTestPaths ( test );

  const baseSrc = ( test === 'extend' ) ? [path.join ( __dirname, `src/component` )] : []; //FIXME: Ugly

  return JSON.stringify ({
    environment: TEST_ENV,
    paths: {
      tokens: {
        src: baseSrc.concat ( src ),
        dist
      }
    }
  });

}

async function buildTest ( test ) {

  const {dist} = getTestPaths ( test ),
        config = getTestConfig ( test ),
        build = await execa ( PACCO_BIN, ['build', '--config', config, '--no-notification', '--verbose'] );

  mkdirp.sync ( dist ); // In case nothing has been built, but we need the folder for `output.txt` files and for diffing

  if ( !argv.check ) { // The `output.txt` files will interfere with diffing

    ['stdout', 'stderr'].forEach ( output => {
      if ( !build[output] ) return;
      const outputPath = path.join ( dist, `${output}.txt` );
      fs.writeFileSync ( outputPath, build[output] );
    });

    console.log ( `${chalk.underline ( test )} built.` );

  }

}

async function checkTest ( test ) {

  const {dist, check} = getTestPaths ( test ),
        diff = await execa ( 'git', ['diff', '--no-index', '--color', dist, check], { reject: false } );

  if ( diff.stdout || diff.stderr ) {

    console.log ( chalk.red ( `${chalk.underline ( test )} failed.` ) );

    ['stdout', 'stderr'].forEach ( output => {
      if ( !diff[output] ) return;
      console.log ( diff[output] );
    });

  } else {

    console.log ( chalk.green ( `${chalk.underline ( test )} passed.` ) );

  }

}

/* TEST */

async function test () {

  const tests = await getTests ();

  for ( let test of tests ) { // We can't iterate asyncronously over them or their temp directories will interfere with each other //FIXME

    await buildTest ( test );

    if ( argv.check ) {
      await checkTest ( test );
    }

  }

}

test ();
