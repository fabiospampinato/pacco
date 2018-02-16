
//TODO: Add a "dynamic" config, basically one generated from the passed arguments, in order to enable Pacco to work without a config at all for many simple cases

/* REQUIRE */

const _            = require ( 'lodash' ),
      argv         = require ( 'yargs' ).argv,
      path         = require ( 'path' ),
      defaults     = require ( './defaults' ),
      environment  = require ( '../utilities/environment' ),
      environments = require ( '../utilities/environments' ),
      file         = require ( '../utilities/file' ),
      custom       = file.loadRecursive ( 'pacco.json', {} ),
      dot          = file.loadRecursive ( '.pacco.json', {} ),
      arg          = environment.getConfigObj () || {};

/* ENVIRONMENT */

const envsRaw = argv.env || arg.environment || dot.environment || custom.environment || defaults.environment,
      envs = environments.parse ( envsRaw ),
      prettyEnvs = environments.pretty ( envs ),
      defaultsEnvs = environments.get ( defaults, envs ),
      customEnvs = environments.get ( custom, envs ),
      dotEnvs = environments.get ( dot, envs ),
      argEnvs = environments.get ( arg, envs );

/* PROJECT */

const project = _.merge ( {}, defaults, ...defaultsEnvs, custom, ...customEnvs, dot, ...dotEnvs, arg, ...argEnvs );

project.environment = envs;
project.paths.tokens.env = prettyEnvs;
project.paths.tokens.environment = prettyEnvs

/* EXPORT */

module.exports = project;
