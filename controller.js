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
	}
]);
