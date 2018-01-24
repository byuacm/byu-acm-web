//*****************************************************************************
//  ANGULAR MODULE SETUP
//*****************************************************************************

var app = angular.module('ACM', ['ngRoute', 'ngSanitize']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider
      .html5Mode(false)
      .hashPrefix('!');
  $routeProvider.
      when('/', {templateUrl: 'html/home.html', controller: HomeCtrl}).
      when('/home', {templateUrl: 'html/home.html', controller:HomeCtrl}).
      when('/about', {templateUrl: 'html/about.html', controller:AboutCtrl}).
      when('/contributors', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
      when('/leaders', {templateUrl: 'html/leaders.html', controller:LeaderCtrl}).
      when('/contributors/:id', {templateUrl: 'html/sponsors.html', controller:SponsorCtrl}).
      when('/events', {templateUrl: 'html/events.html', controller:EventCtrl});
          // Temporary pages
          // when('/icpc', {templateUrl: 'html/icpc.html', controller:IcpcCtrl}).
          // when('/vote', {templateUrl: 'html/vote.html', controller:VoteCtrl})
}]);

//*****************************************************************************
//  ROOTSCOPE SETUP
//*****************************************************************************
app.run(function($rootScope) {
  $rootScope.leaders = [];
  $rootScope.events = [];
  $rootScope.sponsors = [];
});

//*****************************************************************************
//  HOME CONTROLLER
//*****************************************************************************

function HomeCtrl($scope, $routeParams) {

}

//*****************************************************************************
//  ABOUT CONTROLLER
//*****************************************************************************

function AboutCtrl($scope, $routeParams) {

}

//*****************************************************************************
//  SPONSOR CONTROLLER
//*****************************************************************************

function SponsorCtrl($scope, $routeParams) {
  if ($scope.sponsors.length === 0) {
    $.getJSON("js/sponsors.json").then(function(data) {
        $scope.sponsors = data;
        $scope.$digest();
      }
    );
  }
}

//*****************************************************************************
//  LEADER CONTROLLER
//*****************************************************************************

function LeaderCtrl($scope, $routeParams) {

  $scope.scrollTo = function(link) {
    link = 'jump-' + link.object.letter;
    $('html, body').animate({
      scrollTop: $('#' + link).offset().top
    }, 500);
  }

  if ($scope.leaders.length === 0) {
    $.getJSON("js/officers.json").then(function(data) {
        $scope.leaders = data;
        $scope.$digest();
      }
    );
  }

}

//*****************************************************************************
//  EVENT CONTROLLER
//*****************************************************************************

function EventCtrl($scope, $routeParams) {
  if ($scope.events.length === 0) {
    $.getJSON("js/events.json").then(function(data) {
        $scope.events = data;
        $scope.$digest();
      }
    );
  }
}

//*****************************************************************************
//  ICPC CONTROLLER
//*****************************************************************************

function IcpcCtrl($scope, $routeParams) {

}

//*****************************************************************************
//  VOTING CONTROLLER
//*****************************************************************************

function VoteCtrl($scope, $routeParams) {

}
