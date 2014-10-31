
var app = angular.module('accelerate', ['ui.bootstrap', 'acc-operations', 'acc-issues', 'acc-forms']);

app.directive('accHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/header.html'	
	};
});