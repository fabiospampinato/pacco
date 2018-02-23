
//TODO: Add support for `pacco.js` and `.pacco.js` configuration file

/* REQUIRE */

const _ = require ( 'lodash' ),
      path = require ( 'path' ),
      sha1 = require ( 'sha1' ),
      defaults = require ( './defaults' ),
      config = require ( '../utilities/config' ),
      environments = require ( '../utilities/environments' ),
      projectU = require ( '../utilities/project' ),
      targetU = require ( '../utilities/target' ),
      file = require ( '../utilities/file' ),
      custom = file.loadRecursive ( 'pacco.json', {} ),
      dot = file.loadRecursive ( '.pacco.json', {} ),
      arg = config.getObj () || {},
      dynamic = config.getDynamicObj ();

/* TARGET */

const target = dynamic.target || arg.target || dot.target || custom.target || defaults.target,
      defaultsTarget = targetU.get ( defaults, target ),
      customTarget = targetU.get ( custom, target ),
      dotTarget = targetU.get ( dot, target ),
      argTarget = targetU.get ( arg, target ),
      dynamicTarget = targetU.get ( dynamic, target );

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

const project = _.merge ( {}, defaults, defaultsTarget, ...defaultsEnvs, custom, customTarget, ...customEnvs, dot, dotTarget, ...dotEnvs, arg, argTarget, ...argEnvs, dynamic, dynamicTarget, ...dynamicEnvs );

projectU.checkSrcPaths ( project );

/* RUNTIME CONFIGURATION */

project.target = target;
project.environment = envs;
project.paths.tokens.target = target;
project.paths.tokens.env = prettyEnvs;
project.paths.tokens.environment = prettyEnvs
project.paths.tokens.temp = project.paths.tokens.temp || projectU.getTempPath ( project );

/* EXPORT */

module.exports = project;
