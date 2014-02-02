//*****************************************************************************
//  ANGULAR MODULE SETUP
//*****************************************************************************

var app = angular.module('ACM', []);
app.config(['$routeProvider', function($routeProvider,$locationProvider) {
  $routeProvider.
  	  when('/', {templateUrl: 'html/home.html', controller: HomeCtrl}).
  	  when('/home', {templateUrl: 'html/home.html', controller:HomeCtrl}).
  	  when('/about', {templateUrl: 'html/about.html', controller:AboutCtrl}).
  	  when('/contributors', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
  	  when('/members', {templateUrl: 'html/members.html', controller:MemberCtrl}).
  	  when('/contributors/:id', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
  	  when('/members/:id', {templateUrl: 'html/members.html', controller:MemberCtrl}).
  	  when('/events', {templateUrl: 'html/events.html', controller:EventCtrl}).
          // Temporary page. Remove after ICPC.
          // when('/icpc', {templateUrl: 'html/icpc.html', controller:IcpcCtrl}).
      when('/vote', {templateUrl: 'html/vote.html', controller:VoteCtrl});
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

	// member list
	$rootScope.members = [{ letter: 'a', people: []}
						 ,{ letter: 'b', people: []}
						 ,{ letter: 'c', people: []}
						 ,{ letter: 'd', people: []}
						 ,{ letter: 'e', people: []}
						 ,{ letter: 'f', people: []}
						 ,{ letter: 'g', people: []}
						 ,{ letter: 'h', people: []}
						 ,{ letter: 'i', people: []}
						 ,{ letter: 'j', people: []}
						 ,{ letter: 'k', people: []}
						 ,{ letter: 'l', people: []}
						 ,{ letter: 'm', people: []}
						 ,{ letter: 'n', people: []}
						 ,{ letter: 'o', people: []}
						 ,{ letter: 'p', people: []}
						 ,{ letter: 'q', people: []}
						 ,{ letter: 'r', people: []}
						 ,{ letter: 's', people: []}
						 ,{ letter: 't', people: []}
						 ,{ letter: 'u', people: []}
						 ,{ letter: 'v', people: []}
						 ,{ letter: 'w', people: []}
						 ,{ letter: 'x', people: []}
						 ,{ letter: 'y', people: []}
						 ,{ letter: 'z', people: []}];

	$rootScope.hasList = false;
	$rootScope.setMembers = function(list) {
		if(!$rootScope.hasList)
			$rootScope.organizeMembers(list);
		
		$rootScope.hasList = true;
	}
	$rootScope.getMembers = function() {
		return $rootScope.members;
	}
	$rootScope.hasMemberList = function() {
		return $rootScope.hasList;
	}
	$rootScope.organizeMembers = function(list) {

		for (var i = 0; i < list.length; i++) {

			for (var j = 0; j < $rootScope.members.length; j++) {

				var let = $rootScope.members[j].letter;
				var name = list[i].last_name.toLowerCase();

				// if person last name starts with letter, put in this array
				if (name.charAt(0) == let) {
					$rootScope.members[j].people.push(list[i]);
				}
			}
		}

		for (var i = 0; i < $rootScope.members.length; i++) {

			$rootScope.members[i].people.sort(function(a, b) { 

				if (a.last_name.toLowerCase() == b.last_name.toLowerCase()) {
					return a.first_name.toLowerCase() > b.first_name.toLowerCase();
				} else {
					return a.last_name.toLowerCase() > b.last_name.toLowerCase();
				}
			});
		}
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
		{ url: 'img/officer/high_res/group-cropped.jpg',
			photoText: 'Come hang out with the ACM Officers.  Who knows, maybe you will be one someday!' },
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
//  MEMBER CONTROLLER
//*****************************************************************************

function MemberCtrl($scope, $routeParams) {

	$scope.setPageName('Membership');

	$scope.toggleOfficers = function() {

		$('.officers').slideToggle(300);
		$('div.officer-arrow').toggleClass('rotate');
	}

	$scope.toggleMembers = function() {

		$('.members').slideToggle(300);
		$('div.member-arrow').toggleClass('rotate');
	}

	$scope.scrollTo = function(link) {
		
		link = 'jump-' + link.object.letter;
		$('html, body').animate({
			scrollTop: $('#' + link).offset().top
		}, 500);
	}
	
	$scope.members = [];
	if(!$scope.hasMemberList())
	{
		//TODO: update semester
		$.ajax({ url: '/dashboard/member_list/11/', success:function(data) {

				$scope.setMembers(data);
				$scope.members = $scope.getMembers();
				$scope.$digest();
		}});
	} else {

		$scope.members = $scope.getMembers();
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
