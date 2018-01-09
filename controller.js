var app = angular.module('buttonABTest', ['ngCookies', 'ngAnimate']);

app.controller('myCtrl' ,['$scope', '$rootScope', '$cookies', 
	function($scope, $rootScope, $cookies) {
		
		var click_info = {
			'session_id': 'blank_initially'
		};

		$scope.buttonClicked = function () {
			click_info.session_id = Date();
			console.log(click_info);
		};
	}
]);