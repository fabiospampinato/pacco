
// Generating a custom config for each `test/src/*`
//   Merging a specific `test/config/*.json` with `test/config/general.json`
// Building in `test/dist/*`
// Diffing `test/dist/*` against `test/check/*`
// Options:
//   --only testName => run only this test
//   --check         => diff `dist` and `check` directories

/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      chalk = require ( 'chalk' ),
      execa = require ( 'execa' ),
      fs = require ( 'fs' ),
      globby = require ( 'globby' ),
      mkdirp = require ( 'mkdirp' ),
      path = require ( 'path' ),
      rimraf = require ( 'rimraf' );

/* VARIABLES */

const PACCO_BIN = path.resolve ( __dirname, '..', 'bin', 'index.js' );

/* UTILITIES */

async function getTests () {

  const tests = await globby ( '*', {
    cwd: path.join ( __dirname, 'src' ),
    onlyDirectories: true
  });

  if ( argv.only ) {

    if ( tests.includes ( argv.only ) ) return [argv.only];

    console.error ( chalk.red ( `Test "${chalk.underline ( argv.only )}" not found` ) );

    process.exit ( 1 );

  }

  return tests;

}

function getTestPaths ( test ) {

  return {
    config: path.join ( __dirname, 'config', `${test}.json` ),
    src: path.join ( __dirname, 'src', `${test}` ),
    dist: path.join ( __dirname, 'dist', `${test}` ),
    check: path.join ( __dirname, 'check', `${test}` )
  };

}

function getTestConfigGeneral ( test ) {

  const {src, dist} = getTestPaths ( test ),
        configPath = path.join ( __dirname, 'config', 'general.json' ),
        configStr = fs.readFileSync ( configPath, { encoding: 'utf-8' } ),
        configStrReplaced = configStr.replace ( '[src]', src ).replace ( '[dist]', dist ),
        config = JSON.parse ( configStrReplaced );

  return config;

}

function getTestConfigSpecific ( test ) {

  try {

    const {config: configPath} = getTestPaths ( test ),
          configStr = fs.readFileSync ( configPath, { encoding: 'utf-8' } ),
          config = JSON.parse ( configStr );

    return config;

  } catch ( e ) {

    return {};

  }

}

function getTestConfig ( test ) {

  const general = getTestConfigGeneral ( test ),
        specific = getTestConfigSpecific ( test ),
        config = _.merge ( general, specific );

  return JSON.stringify ( config );

}

/* TESTING */

async function testTest ( test ) {

  await cleanTest ( test );

  await buildTest ( test );

  if ( argv.check ) {
    await checkTest ( test );
  }

}

async function cleanTest ( test ) {

  const {dist} = getTestPaths ( test );

  rimraf.sync ( dist );

}

async function buildTest ( test ) {

  const {dist} = getTestPaths ( test ),
        config = getTestConfig ( test ),
        build = await execa ( PACCO_BIN, ['build', '--config', config, '--no-notification', '--verbose'] );

  mkdirp.sync ( dist ); // In case nothing has been built, but we need the folder for `output.txt` files and for diffing

  if ( !argv.check ) { // The `output.txt` files will interfere with diffing

    console.log ( `${chalk.underline ( test )} built` );

    ['stdout', 'stderr'].forEach ( output => {
      if ( !build[output] ) return;
      const outputPath = path.join ( dist, `${output}.txt` );
      fs.writeFileSync ( outputPath, build[output] );
    });

  }

}

async function checkTest ( test ) {

  const {dist, check} = getTestPaths ( test ),
        diff = await execa ( 'git', ['diff', '--no-index', '--color', dist, check], { reject: false } );

  if ( diff.stdout || diff.stderr ) {

    console.log ( chalk.red ( `${chalk.underline ( test )} failed` ) );

    ['stdout', 'stderr'].forEach ( output => {
      if ( !diff[output] ) return;
      console.log ( diff[output] );
    });

  } else {

    console.log ( chalk.green ( `${chalk.underline ( test )} passed` ) );

  }

}

/* TEST */

async function test () {

  const tests = await getTests ();

  tests.map ( testTest );

}

test ();
