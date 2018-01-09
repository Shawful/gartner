var app = angular.module('buttonABTest', ['ngCookies', 'ngAnimate', 'ui.bootstrap']);

app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 
	function ($scope, $uibModalInstance) {

		$scope.submit = function () {
			console.log('submit clicked');
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			console.log('cancel clicked');
			$uibModalInstance.dismiss('cancel');
		};
	}
]);

app.controller('myCtrl' ,['$scope', '$rootScope', '$cookies', '$uibModal', 
	function($scope, $rootScope, $cookies, $uibModal) {
		
		var states = ['Alabama', 'Texas'];
		var animationsEnabled = true;
		var click_info = {
			'session_id': 'blank_initially'
		};
		var time = {
			getExpiration: function () {
				var now = new Date(); 					// javascript date time
				console.log(now);
				now.setDate(now.getDate() + 1);			// one day until expiration
				console.log(now);
				var expiration = now.toUTCString(); 	// "Wdy, DD Mon YYYY HH:MM:SS GMT"
				console.log(expiration);
				
				return expiration;
			}
		};

		$scope.init = function () {
			var variation = $cookies.get('variation');
			var dice_roll;
			var expiration = time.getExpiration();

			if (variation === undefined) {
				// assign variation randomly
				dice_roll = Math.random();
				if (dice_roll < .5) {
					$cookies.put('variation','A', {
						expires: expiration,
						path: '/'
					});
					console.log('set the cookie!');
					console.log($cookies.get('variation'));
				} else {
					$cookies.put('variation','B', {
						expires: expiration,
						path: '/'
					});
					console.log('set the cookie!');
					console.log($cookies.get('variation'));
				}
			} else {
				// display only this variation's image
				console.log(variation);
			}
			console.log('initialized');
			console.log('variation: ' + variation);
		};

		$scope.buttonClicked = function () {
			click_info.session_id = Date();
			console.log(click_info);
			$scope.openModal();
		};

		$scope.openModal = function() {
			
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

		$scope.init();
	}
]);
