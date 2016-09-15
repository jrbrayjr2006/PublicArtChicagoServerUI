/**
 * Created by jamesbray on 9/12/16.
 */

var app = angular.module('publicArt', ["ngRoute"]);
var urlPrefix = "/PublicArtChicago";
//var urlPrefix = "/PAC-dev";

//Parse.initialize('sample-app-id');
//Parse.serverURL = 'http://localhost:1337/parse';
Parse.initialize('FmmE5Ecg2ZUMZmeY2hZV35Zz7sQkHNGHTwDoAiUt', 'fGO88S7C0xYlbJV6zWyCBFU5VswNhZghJRbFUvgM', 'lG6IyFWSPpQD0d21KbdsWKrMXjBG9aeKlUVk3UNe');
Parse.serverURL = 'https://parseapi.back4app.com';

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
.factory('Tours', function($q) {
    var Tours = Parse.Object.extend("Tours", {
        // instance methods
    }, {
        // class methods

        getAllTours: function() {
            console.debug("Tours.getAllTours()");
            var defer = $q.defer();
            var toursQuery = new Parse.Query(this);
            toursQuery.find({
                success: function(tour) {
                    defer.resolve(tour);
                    deferred.resolve({tour: tour.data});
                    data = tour.data;
                    console.debug("data:  " + data);
                },
                error: function(e) {
                    defer.reject(e);
                    console.error("Error while getting Tours from parse.  " + e.message);
                }
            });
            console.info(defer.promise);
            return defer.promise;
        }
    });

    // Properties
    Tours.prototype.__defineGetter__("name", function(){
        return this.get("name");
    });

    Tours.prototype.__defineGetter__("description", function(){
        return this.get("description");
    });

    return Tours;
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
.controller('dashboardController', function($log, $scope, dashboardService, Tours) {
    $scope.dashboardTitle = 'Public Art Chicago Dashboard';
    $scope.baseUrl = urlPrefix;
    $scope.tours = [];

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

    /**
     * This is a function to test parse methods
     */
    $scope.testParse = function() {
        console.debug("testParse()...");
        var tourPromise = Tours.getAllTours();
        tourPromise.then(function(promise) {
            console.debug("promise: " + promise.data);
            $scope.tours = promise.data;
        });
        $scope.tours = tourPromise;
        console.debug($scope.tours);

    };

    Tours.getAllTours().then(function(tours) {
        $scope.tours = tours;
        console.debug($scope.tours);
    }, function(error) {
        console.error(error.message);
    });
})
.controller('modalController', function($uibModal, $log, $scope){
    console.debug("modalController");
    var $modalCtrl = this;

    $modalCtrl.openCreateObjectModal = function() {
        console.debug("openCreateObjectModal()...");
        //
    };
});
