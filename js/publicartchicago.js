/**
 * Created by jamesbray on 9/12/16.
 */

var app = angular.module('publicArt', ["ngRoute"]);
var urlPrefix = "/PublicArtChicago";
//var urlPrefix = "/PAC-dev";

var loginApp = angular.module('loginApp', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when('dashboard', {templateUrl: "/dashboard.html"})
    .when('login', {
        templateUrl: "/PublicArtChicago/login.html",
        controller: "loginController"
    })
    .when("/PublicArtChicago/logout", {templateUrl: urlPrefix + "/index.html"})
    .when("/artists", {templateUrl: urlPrefix + "/view/artists.html"})
    .when("/objects", {templateUrl: urlPrefix + "/view/objects.html"})
    .when("/ads", {templateUrl: urlPrefix + "/view/ads.html"})
    .when("/tours", {templateUrl: urlPrefix + "/view/tours.html"})
    .when("/pois", {templateUrl: urlPrefix + "/view/pois.html"})
    .when("/narrators", {templateUrl: urlPrefix + "/view/narrators.html"})
    .when("/createObject", {templateUrl: urlPrefix + "/view/createObject.html"})
    .otherwise({templateUrl: urlPrefix + "/view/welcome.html"});
})
.service('loginService', function($http, $q, $log) {
    console.debug("loginService...");

    $scope.login = function() {
        console.debug("login()...");
    };
    //
})
.service('dashboardService', function($http, $q, $log) {
    console.debug("dashboardService...");
    //
})
.service('parseService', function($http, $q, $log){
    console.debug("ENTER:: parseService...");
})
.controller('titleController', function($log, $scope) {
    $scope.loginTitle = "Public Art Chicago Login";
    $scope.dashboardTitle = "Public Art Chicago Dashboard";
})
.controller('loginController', function($log, $scope, loginService) {
    console.debug("loginController");
    $scope.loginTitle = "Public Art Chicago Login";
    $scope.usernameTitle = "Username";
    $scope.passwordTitle = "Password";

    $scope.login = function() {
        console.debug("login()...");
    };
})
.controller('dashboardController', function($log, $scope, dashboardService) {
    $scope.dashboardTitle = 'Public Art Chicago Dashboard';
    $scope.baseUrl = urlPrefix;

    $scope.search = function() {
        console.debug("search()...");
    };

    $scope.logout = function() {
        console.debug("logout()...");
        //alert("Logging out now!");
        location.href = 'login.html';
    };

    /**
     * Is used by ng-click directive in button element to navigate to new view
     */
    $scope.openObjectList = function() {
        console.debug("dashboardController.openObjectList()...");
        location.href = urlPrefix + '/dashboard.html#/objects';
    };

    $scope.openCreateObject = function() {
        console.debug("dashboardController.openCreateObject()...");
        location.href = urlPrefix + '/dashboard.html#/createObject';
    };
})
.controller('modalController', function($uibModal, $log, $scope){
    console.debug("modalController");
    var $modalCtrl = this;

    $modalCtrl.openCreateObjectModal = function() {
        console.debug("openCreateObjectModal()...");
        //
    };
});
