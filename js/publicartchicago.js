/**
 * Created by jamesbray on 9/12/16.
 */

var app = angular.module('publicArt', ["ngRoute"]);

var loginApp = angular.module('loginApp', ["ngRoute"]);

app.service('loginService', function($http, $q, $log) {
    console.debug("loginService...");
    //
})
.config(function($routeProvider) {
    $routeProvider.when('dashboard', {templateUrl: "/dashboard.html"})
    .when('login', {
        templateUrl: "login.html",
        controller: "loginController"
    })
    .when("/PublicArtChicago/logout", {templateUrl: "/PublicArtChicago/index.html"})
    .when("/artists", {templateUrl: "/PublicArtChicago/view/artists.html"})
    .when("/objects", {templateUrl: "/PublicArtChicago/view/objects.html"})
    .when("/ads", {templateUrl: "/PublicArtChicago/view/ads.html"})
    .when("/tours", {templateUrl: "/PublicArtChicago/view/tours.html"})
    .when("/pois", {templateUrl: "/PublicArtChicago/view/pois.html"})
    .when("/narrators", {templateUrl: "/PublicArtChicago/view/narrators.html"})
    .otherwise({templateUrl: "/PublicArtChicago/view/welcome.html"});
})
.service('dashboardService', function($http, $q, $log) {
    console.debug("dashboardService...");
    //
})
.controller('titleController', function($log, $scope) {
    $scope.loginTitle = "Public Art Chicago Login";
    $scope.dashboardTitle = "Public Art Chicago Dashboard";
})
.controller('loginController', function($log, $scope, loginService) {
    console.debug("loginController");
    $scope.usernameTitle = "Username";
    $scope.passwordTitle = "Password";
})
.controller('dashboardController', function($log, $scope, dashboardService) {
    $scope.dashboardTitle = 'Public Art Chicago Dashboard';
    //

    $scope.search = function() {
        console.debug("search()...");
    };

    $scope.logout = function() {
        console.debug("logout()...");
        alert("Logging out now!");
        location.href = 'login.html';
    };
});
