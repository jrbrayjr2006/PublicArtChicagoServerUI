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
    .factory('Objects', function($q) {
        var Objects = Parse.Object.extend("Objects", {
            // Instance methods
        }, {
            // Class methods

            getAllObjects: function() {
                console.debug("Objects.getAllObjects()");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                query.find({
                    success: function(object) {
                        defer.resolve(object);
                        console.debug("success retrieving objects data");
                    },
                    error: function(error) {
                        defer.reject(error);
                        console.error("An error occurred while retrieving Objects data.  " + error.message);
                    }
                });
                return defer.promise;
            },

            getSelectedObject: function(objId) {
                console.debug("Objects.getSelectedObject(objId)");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                //TODO
            }
        });

        // Properties
        Objects.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        /*
        Objects.prototype.__defineGetter__("id", function(){
            return this.get("id");
        });
        */
        return Objects;
    })
    .factory('Artists', function($q) {
        var Artists = Parse.Object.extend("Artists", {
            // Instance methods
        }, {
            // Class methods
            getAllArtists: function() {
                console.debug("Objects.getAllArtists()");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                query.find({
                    success: function(artist) {
                        defer.resolve(artist);
                        console.debug("success retrieving Artists data");
                    },
                    error: function(error) {
                        defer.reject(error);
                        console.error("An error occurred while retrieving Artists data.  " + error.message);
                    }
                });
                return defer.promise;
            },

            getSelectedArtist: function(objId) {
                console.debug("Artists.getSelectedArtist(objId)");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                //TODO
            }
        });

        // Properties
        Artists.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        return Artists;
    })
    .factory('pois', function($q) {
        var pois = null;

        return pois;
    })
    .factory('Ads', function($q) {
        var Ads = Parse.Object.extend("Ads", {
            // Instance methods
        }, {
            // Class methods

            getAllAds: function() {
                console.debug("Ads.getAllAds()");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                query.find({
                    success: function(ad) {
                        defer.resolve(ad);
                        console.debug("success retrieving objects data");
                    },
                    error: function(error) {
                        defer.reject(error);
                        console.error("An error occurred while retrieving Objects data.  " + error.message);
                    }
                });
                return defer.promise;
            },

            getSelectedAd: function(objId) {
                console.debug("Ads.getSelectedAd(objId)");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                //TODO
            }
        });

        // Properties
        Ads.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        Ads.prototype.__defineGetter__("advertisementSrc", function() {
            return this.get("advertisementSrc");
        });

        return Ads;
    })
    .factory('Narrators', function($q) {
        var Narrators = Parse.Object.extend("Narrators", {
            // Instance methods
        }, {
            // Class methods

            getAllNarrators: function() {
                console.debug("Narrators.getAllNarrators()");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                query.find({
                    success: function(narrator) {
                        defer.resolve(narrator);
                        console.debug("success retrieving objects data");
                    },
                    error: function(error) {
                        defer.reject(error);
                        console.error("An error occurred while retrieving Objects data.  " + error.message);
                    }
                });
                return defer.promise;
            },

            getSelectedNarrator: function(objId) {
                console.debug("Narrators.getSelectedNarrator(objId)");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                //TODO
            }
        });


        // Properties
        Narrators.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        Narrators.prototype.__defineGetter__("avatarSrc", function(){
            return this.get("avatarSrc");
        });

        return Narrators;
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
                        console.debug("success retrieving tours data");
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
    .controller('dashboardController', function($log, $scope, dashboardService, Tours, Objects, Artists, Ads, Narrators) {
        $scope.dashboardTitle = 'Public Art Chicago Dashboard';
        $scope.baseUrl = urlPrefix;
        $scope.objects = [];
        $scope.artists = [];
        $scope.ads = [];
        $scope.tours = [];
        $scope.narrators = [];

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

        Objects.getAllObjects().then(function(objects) {
            $scope.objects = objects;
            //console.debug($scope.objects);
        }, function(error) {
            console.error(error.message);
        });

        Artists.getAllArtists().then(function(artists) {
            $scope.artists = artists;
        }, function(error) {
            console.error(error.message);
        });

        Ads.getAllAds().then(function(ads) {
            $scope.ads = ads;
        }, function(error) {
            console.error(error.message);
        });

        Tours.getAllTours().then(function(tours) {
            $scope.tours = tours;
            console.debug($scope.tours);
        }, function(error) {
            console.error(error.message);
        });

        Narrators.getAllNarrators().then(function(narrators) {
            $scope.narrators = narrators;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });
    });
