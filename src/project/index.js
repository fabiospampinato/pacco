
/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      defaults = require ( './defaults' ),
      config = require ( '../utilities/config' ),
      projectU = require ( '../utilities/project' ),
      environments = require ( '../utilities/environments' ),
      file = require ( '../utilities/file' ),
      custom = file.loadRecursive ( 'pacco.json', {} ),
      dot = file.loadRecursive ( '.pacco.json', {} ),
      arg = config.getObj () || {},
      dynamic = config.getDynamicObj ();

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

/* RUNTIME CONFIGURATION */

project.environment = envs;
project.paths.tokens.env = prettyEnvs;
project.paths.tokens.environment = prettyEnvs
project.paths.tokens.temp = project.paths.tokens.temp || projectU.getTempPath ( project );

/* EXPORT */

module.exports = project;
