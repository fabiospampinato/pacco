
/* REQUIRE */

const general = require ( './general' );

/* TASK */

const task = () => general ( 'mixins', false );

task.displayName = 'build-scss-mixins';
task.description = 'Build scss mixins';
task.group = 'all';

/* EXPORT */

module.exports = task;
