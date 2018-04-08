
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
      customJSON = file.loadRecursive ( 'pacco.json', {} ),
      customJS = file.loadRecursive ( 'pacco.js', {} ),
      arg = config.getObj () || {},
      dynamic = config.getDynamicObj ();

/* TARGET */

const target = dynamic.target || arg.target || customJS.target || customJSON.target || defaults.target,
      defaultsTarget = targetU.get ( defaults, target ),
      customJSONTarget = targetU.get ( customJSON, target ),
      customJSTarget = targetU.get ( customJS, target ),
      argTarget = targetU.get ( arg, target ),
      dynamicTarget = targetU.get ( dynamic, target );

targetU.checkExistence ( target, defaultsTarget, customJSONTarget, customJSTarget, argTarget, dynamicTarget );

/* ENVIRONMENT */

const envsRaw = dynamic.environment || arg.environment || customJS.environment || customJSON.environment || defaults.environment,
      envs = environments.parse ( envsRaw ),
      prettyEnvs = environments.pretty ( envs ),
      defaultsEnvs = environments.get ( defaults, envs ),
      customJSONEnvs = environments.get ( customJSON, envs ),
      customJSEnvs = environments.get ( customJS, envs ),
      argEnvs = environments.get ( arg, envs ),
      dynamicEnvs = environments.get ( dynamic, envs );

environments.checkExistence ( envs, defaultsEnvs, customJSONEnvs, customJSEnvs, argEnvs, dynamicEnvs );

/* PROJECT */

const project = _.merge ( {}, defaults, defaultsTarget, ...defaultsEnvs, customJSON, customJSONTarget, ...customJSONEnvs, customJS, customJSTarget, ...customJSEnvs, arg, argTarget, ...argEnvs, dynamic, dynamicTarget, ...dynamicEnvs );

projectU.checkSrcPaths ( project );

/* RUNTIME CONFIGURATION */

project.target = target;
project.environment = envs;
project.paths.tokens.target = target;
project.paths.tokens.env = prettyEnvs;
project.paths.tokens.environment = prettyEnvs
project.paths.tokens.temp = project.paths.tokens.temp || projectU.getTempPath ( project );

projectU.initEngines ( project );

/* EXPORT */

module.exports = project;
