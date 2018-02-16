
//TODO: Maybe rename it to `project`

/* REQUIRE */

const _            = require ( 'lodash' ),
      path         = require ( 'path' ),
      sha1         = require ( 'sha1' ),
      defaults     = require ( './defaults' ),
      environment  = require ( '../utilities/environment' ),
      environments = require ( '../utilities/environments' ),
      file         = require ( '../utilities/file' ),
      custom       = file.loadRecursive ( 'pacco.json', {} ),
      dot          = file.loadRecursive ( '.pacco.json', {} ),
      arg          = environment.getConfigObj () || {},
      dynamic      = environment.getDynamicConfigObj ();

/* ENVIRONMENT */

const envsRaw = dynamic.environment || arg.environment || dot.environment || custom.environment || defaults.environment,
      envs = environments.parse ( envsRaw ),
      prettyEnvs = environments.pretty ( envs ),
      defaultsEnvs = environments.get ( defaults, envs ),
      customEnvs = environments.get ( custom, envs ),
      dotEnvs = environments.get ( dot, envs ),
      argEnvs = environments.get ( arg, envs ),
      dynamicEnvs = environments.get ( dynamic, envs );

/* PROJECT */

const project = _.merge ( {}, defaults, ...defaultsEnvs, custom, ...customEnvs, dot, ...dotEnvs, arg, ...argEnvs, dynamic, ...dynamicEnvs );

project.environment = envs;
project.paths.tokens.env = prettyEnvs;
project.paths.tokens.environment = prettyEnvs
project.paths.tokens.temp = project.paths.tokens.temp || path.join ( process.cwd (), '.temp', environment.getProjectHash ( project ) ); // In order to allow for multiple simultaneous compilations

/* EXPORT */

module.exports = project;
