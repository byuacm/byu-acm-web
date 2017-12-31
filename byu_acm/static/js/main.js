//*****************************************************************************
//  ANGULAR MODULE SETUP
//*****************************************************************************

var app = angular.module('ACM', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider
      .html5Mode(false)
      .hashPrefix('!');
    $routeProvider.when('/', {
        templateUrl: '/static/home/home.html',
        controller: HomeCtrl
    }).when('/home', {
        templateUrl: '/static/home/home.html',
        controller: HomeCtrl
    }).when('/about', {
        templateUrl: '/static/home/about.html',
        controller: AboutCtrl
    }).when('/contributors', {
        templateUrl: '/static/home/sponsors.html',
        controller: SponsorCtrl
    }).when('/officers', {
        templateUrl: '/static/home/officers.html',
        controller: LeaderCtrl
    }).when('/contributors/:id', {
        templateUrl: '/static/home/sponsors.html',
        controller: SponsorCtrl
    }).when('/events', {
        templateUrl: '/static/home/events.html',
        controller: EventCtrl
    });
}]);

app.run(function ($rootScope) {
    //
    // NavBar & Page Title (for highlighting currently selected)
    $rootScope.slideshow = null;
    $rootScope.setSlideshow = function (show) {
        $rootScope.slideshow = show;
    };
    $rootScope.clearSlideshow = function () {
        clearTimeout($rootScope.slideshow);
    };

    $rootScope.officers = [];
    $rootScope.hasList = false;
    $rootScope.setLeaders = function (list) {
        $rootScope.officers = list;
        $rootScope.hasList = true;
    };
    $rootScope.getLeaders = function () {
        return $rootScope.officers;
    };
    $rootScope.hasLeaderList = function () {
        return $rootScope.hasList;
    };
});

function HomeCtrl($scope, $routeParams) {

}

function AboutCtrl($scope, $routeParams) {

}

function SponsorCtrl($scope, $routeParams) {

}

function LeaderCtrl($scope, $routeParams) {

    $scope.scrollTo = function (link) {
        link = 'jump-' + link.object.letter;
        $('html, body').animate({
            scrollTop: $('#' + link).offset().top
        }, 500);
    };

    $scope.officers = [];
    if (!$scope.hasLeaderList()) {
        $.getJSON("/static/home/officers.json").then(function (data) {
                $scope.setLeaders(data);
                $scope.officers = $scope.getLeaders();
                $scope.$digest();
            }
        );
    } else {
        $scope.officers = $scope.getLeaders();
    }

}

function EventCtrl($scope, $routeParams) {

}

