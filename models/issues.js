var app = angular.module('acc-issues', [ ]);
	
app.controller('IssueController', ['$scope','$sce','IssueFactory', function($scope, $sce, IssueFactory) {
	
	$scope.data = [];
	
	IssueFactory.getData().then(success,error);

	function success(response) {
		$scope.issues = response.data.splice(0, 1);
		console.log($scope.issues);
		$scope.issue_main = $scope.issues[0];
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

app.factory('IssueFactory', function($http) { 

	function getData() {
		return $http.get('data/issues.json');
	}
	
	return {
		getData: getData	
	}
	
	//alert(mainInfo);

});