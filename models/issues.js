var app = angular.module('acc-issues', ['ngSanitize']);
	
app.controller('IssueController', ['$scope','$sce','IssueFactory', function($scope, $sce, IssueFactory) {
	
	$scope.data = [];
	
	IssueFactory.getData().then(success,error);

	function success(response) {
		var issues = response.data;

		$scope.issue_main = issues[0];
		
		if (issues.length <= 1) {
			issues = [];
		} else {
			issues.shift();
		}

		$scope.issues = issues;
	}
	
	function error(err) {
		console.log(err);	
	}
	
}]);

app.directive('issueFeature', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/issue-feature.html'	
	};
});

app.directive('issueArchive', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/issue-archive.html'	
	};
});

app.factory('IssueFactory', function($http) { 

	function getData() {
		return $http.get('data/issues.json');
	}
	
	return {
		getData: getData	
	}
	
	//alert(mainInfo);

});