//*****************************************************************************
//  ANGULAR MODULE SETUP
//*****************************************************************************

var app = angular.module('ACM', []);
app.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider.
  	when('/', {templateUrl: 'html/home.html', controller: HomeCtrl}).
  	when('/home', {templateUrl: 'html/home.html', controller:HomeCtrl}).
  	when('/about', {templateUrl: 'html/about.html', controller:AboutCtrl}).
  	when('/contributors', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
  	when('/leaders', {templateUrl: 'html/leaders.html', controller:LeaderCtrl}).
  	when('/contributors/:id', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
  	when('/events', {templateUrl: 'html/events.html', controller:EventCtrl}).
    // Temporary page. Remove after ICPC.
    // when('/icpc', {templateUrl: 'html/icpc.html', controller:IcpcCtrl}).
    when('/vote', {templateUrl: 'html/vote.html', controller:VoteCtrl});

    $locationProvider.html5Mode(true);
}]);

//*****************************************************************************
//  ROOTSCOPE SETUP
//*****************************************************************************
app.run(function($rootScope) {

	// NavBar & Page Title (for highlighting currently selected)
	$rootScope.pageName = '';
	$rootScope.setPageName = function(name) {
		$rootScope.pageName = name;
		$rootScope.clearSlideshow();
	}
	$rootScope.slideshow;
	$rootScope.setSlideshow = function(show) {
		$rootScope.slideshow = show;
	}
	$rootScope.clearSlideshow = function() {
		clearTimeout($rootScope.slideshow);
	}

    $rootScope.leaders = [];
	$rootScope.hasList = false;
	$rootScope.setLeaders = function(list) {
        $rootScope.leaders = list;
		$rootScope.hasList = true;
	}
	$rootScope.getLeaders = function() {
		return $rootScope.leaders;
	}
	$rootScope.hasLeaderList = function() {
		return $rootScope.hasList;
	}

});

//*****************************************************************************
//  HOME CONTROLLER
//*****************************************************************************

function HomeCtrl($scope, $routeParams) {

	$scope.setPageName('Home');

	// slideshow
	// 45 X 13 aspect ratio
	$scope.photos = [

		{ url: 'img/meetings/opening_social_winter_2013-1-cropped.jpg',
			photoText: 'Come check out a meeting.  Food, prizes, awesome demos.  You will love it!' },
		{ url: 'img/meetings/opening_social_winter_2013-4-cropped.jpg',
			photoText: 'Google gave us an inside look at what it\'s like to work there!' }
	];

	$scope.count = 0;
	$scope.total = $scope.photos.length;
	$scope.delay = 7500;
	$scope.photo = $scope.photos[$scope.count].url;
	//$scope.photoText = $scope.photos[$scope.count].photoText;

	$scope.changePhoto = function() {

		$scope.count = ($scope.count + 1 == $scope.total) ? 0 : $scope.count + 1;

		$('#photo-slide img').after('<img src="' + $scope.photos[$scope.count].url + '" class="above">');
		$('#photo-slide img + img').animate({
			bottom: '0px'
		}, 500, function() {
			$('#photo-slide').children().first().remove();
			$(this).removeClass('above');
			//$scope.photoText = $scope.photos[$scope.count].photoText;
			//$scope.$digest();
		});
		
		$scope.setSlideshow(setTimeout(function() { $scope.changePhoto(); }, $scope.delay));
	}

	$scope.clickBar = function(direction) {

		$scope.clearSlideshow();
		if (direction == 'right') {

			$scope.count = ($scope.count + 1 == $scope.total) ? 0 : $scope.count + 1;

		} else {

			$scope.count = ($scope.count - 1 < 0) ? $scope.total - 1 : $scope.count - 1;
		}

		$("#photo-slide img").attr('src', $scope.photos[$scope.count].url);
		$scope.setSlideshow(setTimeout(function() { $scope.changePhoto(); }, $scope.delay));
		//$scope.photoText = $scope.photos[$scope.count].photoText;
		//$scope.$digest();
	}

	$scope.setSlideshow(setTimeout(function() { $scope.changePhoto(); }, $scope.delay));
}

//*****************************************************************************
//  ABOUT CONTROLLER
//*****************************************************************************

function AboutCtrl($scope, $routeParams) {
	$scope.setPageName('About');
}

//*****************************************************************************
//  SPONSOR CONTROLLER
//*****************************************************************************

function SponsorCtrl($scope, $routeParams) {
	$scope.setPageName('Contributors');
}

//*****************************************************************************
//  LEADER CONTROLLER
//*****************************************************************************

function LeaderCtrl($scope, $routeParams) {
	$scope.setPageName('Leadership');

	$scope.scrollTo = function(link) {
		link = 'jump-' + link.object.letter;
		$('html, body').animate({
			scrollTop: $('#' + link).offset().top
		}, 500);
	}
	
	$scope.leaders = [];
	if(!$scope.hasLeaderList())
	{
		$.getJSON("js/officers.json").then(
            function(data) {
                $scope.setLeaders(data);
			    $scope.leaders = $scope.getLeaders();
				$scope.$digest();
		    }
        );
	} else {
		$scope.leaders = $scope.getLeaders();
	}

}

//*****************************************************************************
//  EVENT CONTROLLER
//*****************************************************************************

function EventCtrl($scope, $routeParams) {

	$scope.setPageName('Events');
}

//*****************************************************************************
//  ICPC CONTROLLER
//*****************************************************************************

function IcpcCtrl($scope, $routeParams) {

	$scope.setPageName('ICPC');
}

//*****************************************************************************
//  VOTING CONTROLLER
//*****************************************************************************

function VoteCtrl($scope, $routeParams) {

	$scope.setPageName('Voting');
}
