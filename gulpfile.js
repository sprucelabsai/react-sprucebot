var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');


var taskConfig = {

	component: {
		name: 'components/Avatar/Avatar.js',
		dependencies: [
			'classnames',
			'react',
			'react-dom'
		],
		lib: 'lib'
	}

};

initGulpTasks(gulp, taskConfig);
