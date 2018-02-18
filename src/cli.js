
/* REQUIRE */

const _ = require ( 'lodash' ),
      argv = require ( 'yargs' ).argv,
      caporal = require ( 'caporal' ),
      chalk = require ( 'chalk' ),
      readPkg = require ( 'read-pkg-up' ),
      updateNotifier = require ( 'update-notifier' ),
      gutil = require ( './utilities/gutil' );

/* CLI */

async function CLI () {

  /* GULP */

  gutil.patch ();

  /* APP */

  const {pkg} = await readPkg ({ cwd: __dirname });

  updateNotifier ({ pkg }).notify ();

  const app = caporal.version ( pkg.version );

  /* OPTIONS */

  app.option ( '--source, --src, -s <path>', 'Path to the source directory - can be used multiple times' );
  app.option ( '--dist, --dest, --dst, -d <path>', 'Path to the distribution directory' ); // We actually also support "--distribution, --destination"
  app.option ( '--config <path|object>', `Your project\'s configuration path or JSON object` );
  app.option ( '--environment, --env, -e <environment>', 'The environment to use - can be used multiple times' ); // We actually also support "--environments, --envs"
  app.option ( '--fresh', 'Clear the cache before building' );
  app.option ( '--no-notification', 'Disable the notification after building' );
  // app.option ( '--verbose', 'Enable some extra logging' ); // There's a global option called "verbose"

  /* TASKS */

  const taskNames = [
    'config',
    'clean/json', 'clean/fonts', 'clean/images', 'clean/javascript', 'clean/javascript_temp', 'clean/scss', 'clean/css', 'clean/style', 'clean',
    'watch/json', 'watch/fonts', 'watch/images', 'watch/javascript', 'watch/scss', 'watch',
    'build/json', 'build/fonts', 'build/images', 'build/javascript/temp', 'build/javascript/development', 'build/javascript/production', 'build/javascript', 'build/scss/parts/functions', 'build/scss/parts/keyframes', 'build/scss/parts/mixins', 'build/scss/parts/style', 'build/scss/parts/variables', 'build/scss/parts', 'build/scss', 'build/css', 'build/style', 'build'
  ];
  const tasks = taskNames.map ( name => require ( `./tasks/${name}` ) );
  tasks.forEach ( task => {
    const hidden = ( task.group === 'all' && !argv.all ) || ( task.group === 'more' && !argv.all && !argv.more );
    const command = app.command ( task.displayName, task.description ).action ( task ).visible ( !hidden );
    command._options = app._defaultCommand._options; // Not all commands support all the options, but it's good enough
    if ( task.args ) {
      task.args.forEach ( args => {
        command.argument ( ...args );
      });
    }
  });

  /* DEFAULT TASK */

  const task = require ( './tasks/default' );
  app.command ( task.displayName, task.description ).action ( task );
  app.action ( task );

  /* HELP */

  app.command ( 'help', 'Display help' )
     .option ( '--more', 'Show more available commands' )
     .option ( '--all', 'Show all available commands' );

  /* DEFAULT COMMAND */

  const command = app._defaultCommand;
  const helpLines = [
    `pacco ${chalk.magenta ( 'help' )} ${chalk.green ( '--all' )}`,
    `pacco ${chalk.green ( '--src' )} ${chalk.blue ( './source' )} ${chalk.green ( '--dist' )} ${chalk.blue ( './bundle' )}`,
    `pacco ${chalk.green ( '--config' )} ${chalk.blue ( '/path/to/pacco.json' )}`,
    `pacco ${chalk.magenta ( 'build' )} ${chalk.green ( '--config' )} ${chalk.blue ( '/path/to/pacco.json' )} ${chalk.green ( '--env' )} ${chalk.blue ( 'development' )}`
  ];

  command.help ( helpLines.join ( '\n' ), { name: 'USAGE - ADVANCED' } );

  /* PARSE */

  caporal.parse ( process.argv );

}

/* EXPORT */

module.exports = CLI;
