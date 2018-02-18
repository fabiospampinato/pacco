
/* REQUIRE */

const general = require ( './general' );

/* TASK */

const task = () => general ( 'functions', false );

task.displayName = 'build-scss-functions';
task.description = 'Build scss functions';
task.group = 'all';

/* EXPORT */

module.exports = task;
