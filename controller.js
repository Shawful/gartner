var app = angular.module('buttonABTest', ['ngCookies', 'ngAnimate', 'ui.bootstrap']);

app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$cookies', 
	function ($scope, $uibModalInstance, $cookies) {

		$scope.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE'];

		var time = {
			getExpiration: function () {
				var now = new Date(); 					// javascript date time
				// console.log(now);
				now.setDate(now.getDate() + 1);			// one day until expiration
				// console.log(now);
				var expiration = now.toUTCString(); 	// "Wdy, DD Mon YYYY HH:MM:SS GMT"
				// console.log(expiration);
				
				return expiration;
			}
		};

		$scope.$watch('name', function(newValue, oldValue) {
			if (newValue != oldValue) {
				console.log(newValue);
			}
		});

		var init = function () {
			var variation = $cookies.get('variation');
			// console.log('variation: ' + variation);
			var dice_roll;
			var expiration = time.getExpiration();
			var selection = '';

			if (variation === undefined) {
				// assign variation randomly
				dice_roll = Math.random();
				if (dice_roll < .5) {
					$cookies.put('variation','A', {
						expires: expiration,
						path: '/'
					});
					selection = 'A.png';
					console.log('set the A variation in cookie!');
				} else {
					$cookies.put('variation','B', {
						expires: expiration,
						path: '/'
					});
					selection = 'B.png';
					console.log('set the B variation in cookie!');
				}
			} else {
				// A variation has already been assigned for this client!
				selection = $cookies.get('variation') + '.png';
				// console.log($cookies.get('variation') + ' variation already set');
			}
			
			return selection;
		};

		$scope.image_choice = init();
		$scope.variation = $scope.image_choice.charAt(0);

		$scope.submit = function () {
			console.log({
				'name': $scope.name,
				'email': $scope.email,
				'phone': $scope.phone,
				'address': $scope.address,
				'city': $scope.city,
				'state': $scope.state,
				'zipcode': $scope.zipcode,
				'variation': $scope.variation
			});
			console.log('submit clicked');
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			console.log('cancel clicked');
			$uibModalInstance.dismiss('cancel');
		};

		return $scope;
	}
]);

app.controller('myCtrl' ,['$scope', '$rootScope', '$cookies', '$uibModal', 
	function($scope, $rootScope, $cookies, $uibModal) {
		var states = ['Alabama', 'Texas'];
		var animationsEnabled = true;
		var click_info = {
			'session_id': 'blank_initially'
		};

		$scope.buttonClicked = function () {
			click_info.session_id = Date();
			console.log(click_info);
			$scope.openModal();
		};

		$scope.openModal = function() {
			var image_choice = 'A.png';
		    var modalInstance = $uibModal.open({
		      animation: animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		    });

		    modalInstance.result.then(function () {
		      // Data Submitted
		    }, function () {
		      // Modal dismissed
		      console.log('Modal dismissed at: ' + new Date());
		    });
		};
	}
]);
