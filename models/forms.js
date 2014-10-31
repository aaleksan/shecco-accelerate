var app = angular.module('acc-forms', [ ]);
	
app.controller('FormsController', ['$scope','CountriesFactory', function($scope, CountriesFactory) {
	
	$scope.countries = [];
	
	CountriesFactory.getData().then(success,error);

	function success(response) {
		$scope.countries = response.data;
		console.log($scope.data);
	}
	
	function error(err) {
		console.log(err);	
	}
	
}]);

app.factory('CountriesFactory', function($http) { 

	function getData() {
		return $http.get('data/countries.json');
	}
	
	return {
		getData: getData	
	}
	
	//alert(mainInfo);

});