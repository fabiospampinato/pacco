
/* REQUIRE */

const general = require ( './general' );

/* TASK */

const task = () => general ( 'keyframes', true );

task.displayName = 'build-scss-keyframes';
task.description = 'Build scss keyframes';
task.group = 'all';

/* EXPORT */

module.exports = task;
