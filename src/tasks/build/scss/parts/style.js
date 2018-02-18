
/* REQUIRE */

const general = require ( './general' );

/* TASK */

const task = () => general ( 'style', true );

task.displayName = 'build-scss-style';
task.description = 'Build scss style';
task.group = 'all';

/* EXPORT */

module.exports = task;
