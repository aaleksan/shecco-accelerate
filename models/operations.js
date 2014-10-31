var app = angular.module('acc-operations', [ ]);
	
app.directive("skew", function($timeout){
	return {
		restrict: "A",
		link: function(scope, element, attrs){
			
			attrs.$observe('image',function(){
			
				var image = new Image();
				image.onload = function() {
					var width = image.width,
					height = image.height;
					var ctx = element[0].getContext('2d');
					for (var i = 0; i <= height / 2; ++i) {
						ctx.setTransform(0.8, 0.2 * i / height,
							0, 1, 0, 0);
						ctx.drawImage(image,
							0, height / 2 - i, width, 2,
							0, height / 2 - i, width, 2);
						ctx.setTransform(0.8, -0.2 * i / height,
							0, 1, 0, 0);
						ctx.drawImage(image,
							0, height / 2 + i, width, 2,
							0, height / 2 + i, width, 2);
					}
				}
				image.src = attrs.image;
				
			});
		}
	}
});

app.directive('resizable', function($window) {
  return function($scope) {
	$scope.initializeWindowSize = function() {
		$scope.setMargin = $window.innerWidth;
		$scope.setMargin = Math.round(($scope.setMargin-940)/2);
		$scope.setMargin -= 316;
		$scope.setMargin = ($scope.setMargin < 0) ? 0 : $scope.setMargin;
		//console.log($scope.setMargin);
		return true;
	};
	$scope.initializeWindowSize();
	return angular.element($window).bind('resize', function() {
	  $scope.initializeWindowSize();
	  return $scope.$apply();
	});
  };
});

app.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
	var newWidth = 600 + slides.length;
	slides.push({
	  image: 'http://placekitten.com/' + newWidth + '/300',
	  text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
		['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	});
  };
  for (var i=0; i<4; i++) {
	$scope.addSlide();
  }
});

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

	var modalInstance = $modal.open({
	  templateUrl: 'subscribe.html',
	  controller: 'ModalInstanceCtrl',
	  windowClass: 'modal-vertical-centered',
	  size: size,
	  resolve: {
		items: function () {
		  return $scope.items;
		}
	  }
	});

	modalInstance.result.then(function (selectedItem) {
	  $scope.selected = selectedItem;
	}, function () {
	  $log.info('Modal dismissed at: ' + new Date());
	});
  };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
	item: $scope.items[0]
  };

  $scope.ok = function () {
	$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
	$modalInstance.dismiss('cancel');
  };
});