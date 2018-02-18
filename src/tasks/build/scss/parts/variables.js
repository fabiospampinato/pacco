
/* REQUIRE */

const general = require ( './general' );

/* TASK */

const task = () => general ( 'variables', false );

task.displayName = 'build-scss-variables';
task.description = 'Build scss variables';
task.group = 'all';

/* EXPORT */

module.exports = task;
