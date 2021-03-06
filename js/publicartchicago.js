/**
 * Created by jamesbray on 9/12/16.
 */
var fileInput = '';
$(function() {

    // We can attach the `fileselect` event to all file inputs on the page
    $(document).on('change', ':file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        console.debug(label);
        fileInput = label;
        input.trigger('fileselect', [numFiles, label]);
    });
});

function pointerBuilder(ojbId) {

}

var app = angular.module('publicArt', ["ngRoute"]);
var urlPrefix = "/PublicArtChicago";
//var urlPrefix = "/PAC-dev";

//Parse.initialize('sample-app-id');
//Parse.serverURL = 'http://localhost:1337/parse';
Parse.initialize('FmmE5Ecg2ZUMZmeY2hZV35Zz7sQkHNGHTwDoAiUt', 'fGO88S7C0xYlbJV6zWyCBFU5VswNhZghJRbFUvgM', 'lG6IyFWSPpQD0d21KbdsWKrMXjBG9aeKlUVk3UNe');
Parse.serverURL = 'https://parseapi.back4app.com';

var loginApp = angular.module('loginApp', ["ngRoute"]);

loginApp.controller('titleController', function($log, $scope) {
        console.debug("titleController");
        $scope.loginTitle = "Public Art Chicago Login";
        $scope.dashboardTitle = "Public Art Chicago Dashboard";
    })
    .controller('loginController', function($log, $scope, loginService) {
        console.debug("loginController");
        //$scope.loginTitle = "Public Art Chicago Login";
        $scope.usernameTitle = "Username";
        $scope.passwordTitle = "Password";

        $scope.login = function() {
            console.debug("login()...");
        };
    });

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
        .when("/createArtist", {templateUrl: urlPrefix + "/view/createArtist.html"})
        .when("/createTour", {templateUrl: urlPrefix + "/view/createTour.html"})
        .when("/createPOI", {templateUrl: urlPrefix + "/view/createPOI.html"})
        .when("/createAd", {templateUrl: urlPrefix + "/view/createAd.html"})
        .when("/createNarrator", {templateUrl: urlPrefix + "/view/createNarrator.html"})
        .otherwise({templateUrl: urlPrefix + "/view/welcome.html"});
    })
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])
    .directive('file', function() {
        return {
            restrict: 'AE',
            scope: {
                file: '@'
            },
            link: function(scope, el, attrs){
                el.bind('change', function(event){
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file;
                    scope.$parent.file = file;
                    scope.$apply();
                });
            }
        };
    }).factory('Objects', function($q) {
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
                console.debug("::ENTER:: Objects.getSelectedObject(objId)");
                var defer = $q.defer();
                var query = new Parse.Query(this);
                //TODO
            },

            saveNewObject: function(object) {
                console.debug("::ENTER:: Objects.saveNewObject(object)...");
                var defer = $q.defer();
                var objects = new Objects();
                objects.set("name", object.name);
                objects.set("address", object.address);
                objects.set("city", object.city);
                objects.set("state", object.state);
                objects.set("zipcode", object.zipcode);
                objects.set("url", object.url);
                objects.set("location", object.location);
                objects.set("type", object.type);
                // BEGIN objects not POI
                objects.set("art_type", object.art_type);
                //objects.set("artists", object.artists);
                objects.set("artists", [{"__type":"Pointer","className":"Artists","objectId":"12ZuvLmfQ3"},{"__type":"Pointer","className":"Artists","objectId":"1kjB57pJ6G"},{"__type":"Pointer","className":"Artists","objectId":"1qZ27Y5unn"}]);
                //objects.set("benefactors", object.benefactors);
                objects.set("benefactors", [{"__type":"Pointer","className":"Sponsor","objectId":"1uveJ8cCNB"},{"__type":"Pointer","className":"Sponsor","objectId":"F1i3F9cgIM"}]);
                objects.set("creation_date", object.creation_date);
                objects.set("description", object.description);
                objects.set("measurements", object.measurements);
                objects.set("history_description", object.history_description);
                objects.set("narrator_fun_fact", {"__type":"Pointer", "className":"Narrators", "objectId":object.narrator_fun_fact});
                objects.set("narrator_gen_fact", {"__type":"Pointer", "className":"Narrators", "objectId":object.narrator_gen_fact});
                objects.set("object_images", object.object_images);
                objects.set("isDemoObject", object.isDemoObject);
                objects.set("thumbnail", object.thumbnail);
                // END
                objects.save(null, {
                    success: function(objects) {
                        if(objects.type == "cultural") {
                            console.debug("Successfully created new POI...");
                        } else {
                            console.debug("Successfully created new Object...");
                        }
                        defer.resolve(objects);
                        objects.set("id", objects.id);
                        console.debug("The new objectId for this object is: " + objects.id);
                    },
                    error: function(error) {
                        if(object.type == "cultural") {
                            console.error("Error occurred while creating POI! " + error.message);
                        } else {
                            console.error("Error occurred while creating Object! " + error.message);
                        }
                        return "Not created";
                    }
                });
                console.debug(defer.promise);
                return defer.promise;
            },


            deleteObject: function(objId) {
                console.debug("::ENTER:: Objects.deleteObject(objId)...");
                var objects = new Objects();
                objects.set("id", objId);
                objects.destroy({
                    success: function() {
                        console.debug("Object deleted from the database");
                    },
                    error: function(e) {
                        console.error(e.message);
                    }
                });
            },


            updateObject: function(object) {
                console.debug("::ENTER:: Objects.updateObject(object)...");
                //TODO
                console.debug("::EXIT:: Objects.updateObject(object)...");
            }
        });

        // Properties
        Objects.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });


        Objects.prototype.__defineGetter__("artists", function(){
            return this.get("artists");
        });

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
                query.get(objId, {
                    success: function(artist) {
                        defer.resolve(artist);
                        console.debug("Retrieved selected artist..." + artist.name);
                    },
                    error: function(object, error) {
                        console.error("The artist retrieval failed!  " + error.message);
                        $log("The artist retrieval failed!");
                    }
                });
            },

            saveNewArtist: function(artist) {
                console.debug("Artists.saveNewArtist(artist)...");
                var artists = new Artists();
                artists.set("name", artist.name);
                artists.set("info", artist.info);
                artists.save(null, {
                    success: function(artists) {
                        console.info("New artist " + artists.name + " added to database.");
                        alert("New artist " + artists.name + " added to database.");
                    },
                    error: function(artist, error) {
                        console.error("Creation of new artist failed!  " + error.message);
                    }
                });
                console.debug("artist saved: " + artist.name);
            },

            deleteArtist: function(objId) {
                console.debug("Artists.deleteArtist(objId)...");
                var artists = new Artists();
                artists.set("id", objId);
                artists.destroy({
                    success: function(artists) {
                        console.info("Artist deleted from database.");
                    },
                    error: function(artists, error) {
                        console.error("Deletion of artist failed!  " + error.message);
                    }
                });
            }
        });

        // Properties
        Artists.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        return Artists;
    })
    .factory('Ads', function($q) {
        var Ads = Parse.Object.extend("Ads", {
            // Instance methods
        }, {
            // Class methods

            /**
             *
             * @returns {*}
             */
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
                console.debug("::ENTER:: Ads.getSelectedAd(objId)");
                var defer = $q.defer();
                var ads = new Ads();
                ads.set("id", objId);
                var query = new Parse.Query(this);
                //TODO
            },

            /**
             *
             * @param ad
             */
            saveNewAd: function(ad) {
                console.debug("::ENTER:: Ads.saveNewAd(ad)");
                var ads = new Ads();
                ads.set("name", ad.name);
                ads.set("isDemoAd", ad.isDemoAd);
                ads.set("advertisementSrc", ad.advertisementSrc);
                ads.save(null, {
                    success: function(ad) {
                        console.info("New ad for " + ads.name + " saved to database");
                    },
                    error: function(e) {
                        console.error(e.message);
                    }
                });
                console.debug("::EXIT:: Ads.saveNewAd(ad)");
            },

            /**
             *
             * @param objId
             */
            deleteAd: function(objId) {
                console.debug("::ENTER:: Ads.deleteAd(objId)");
                var ads = new Ads();
                ads.set("id", objId);
                ads.destroy({
                    success: function(ads) {
                        console.info(ads.name + " ad deleted");
                    },
                    error: function(e) {
                        console.error(e.message);
                    }
                });
                console.debug("::EXIT:: Ads.deleteAd(objId)");
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
                return defer.promise;
            },

            saveNewNarrator: function(narrator) {
                console.debug("Narrators.saveNewNarrator(narrator)");
                var defer = $q.defer();
                var narrators = new Narrators();
                narrators.set("name", narrator.name);
                narrators.set("avatarSrc", narrator.avatarSrc);
                narrators.save(null, {
                    success: function(narrators) {
                        console.info(narrators.name + " added to database...");
                    },
                    error: function(narrators, e) {
                        console.error("Creation of new narrator failed!  " + e.message);
                    }
                });
                //return defer.promise;
                console.info("Narrator save attempt complete");
            },

            updateNarrator: function(objId) {
                console.debug("Narrators.updateNarrator(narrator)");
                var defer = $q.defer();
                //TODO
                return defer.promise;
            },

            deleteNarrator: function(objId) {
                console.debug("Narrators.deleteNarrator(objId)");
                var narrators = new Narrators();
                narrators.set("id", objId);
                narrators.destroy({
                    success: function() {
                        console.debug("Narrator deleted");
                        $log(objId + " :Narrator deleted");
                    },
                    error: function(e) {
                        console.error("Narrator deletion failed");
                    }
                });
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
            },

            saveNewTour: function(tour) {
                console.debug("Tours.saveNewTour(Tours)...");
                var defer = $q.defer();
                var tours = new Tours();
                tours.set("name", tour.name);
                tours.set("description", tour.description);
                tours.set("objects", tour.objects);
                tours.set("isDemoTour", tour.isDemoTour);
                tours.save(null, {
                    success: function(tours){
                        console.info(tours.name + " added to the database...");
                    },
                    error: function(tours, e){
                        console.error("Creation of new tour failed!  " + e.message);
                    }
                });
            },

            deleteTour: function(objId) {
                console.debug("Tours.deleteTour(objId)...");
                var defer = $q.defer();
                var tours = new Tours();
                tours.set("id", objId);
                tours.destroy({
                    success: function() {
                        console.info("Tour deleted with id " + objId);
                        $log("Tour deleted with id " + objId);
                    },
                    error: function(e) {
                        console.error("An error occurred while attempting to delete the tour...");
                    }
                });
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
    .factory('POIS', function($q) {
        // Points of interests are objects that are classified as 'cultural'
        var POIS = Parse.Object.extend("Objects", {
            // instance methods
        }, {
            // class methods

            getAllPointsOfInterest: function() {
                console.debug("::ENTER:: POIS.getAllPointsOfInterest()...");
                var defer = $q.defer();
                var poisQuery = new Parse.Query(this);
                //cultural objects are points of interest
                poisQuery.equalTo("type", "cultural");
                poisQuery.find({
                    success: function(pois) {
                        defer.resolve(pois);
                        console.debug("success retrieving objects data");
                    },
                    error: function(error) {
                        defer.reject(error);
                        console.error("An error occurred while retrieving Objects data.  " + error.message);
                    }
                });

                console.info(defer.promise);
                return defer.promise;
            }
        });

        POIS.prototype.__defineGetter__("name", function() {
            return this.get("name");
        });

        POIS.prototype.__defineGetter__("location", function() {
            return this.get("location");
        });

        return POIS;
    })
    .factory('Sponsor', function($q) {
        var Sponsor = Parse.Object.extend("Sponsor", {
            // instance methods
        }, {
            // class methods

            getAllSponsors: function() {
                console.debug("Sponsor.getAllSponsors()");
                var defer = $q.defer();
                var sponsorQuery = new Parse.Query(this);
                sponsorQuery.find({
                    success: function(sponsor) {
                        defer.resolve(sponsor);
                        console.debug("success retrieving sponsor data");
                    },
                    error: function(e) {
                        defer.reject(e);
                        console.error("Error while getting Sponsor from parse.  " + e.message);
                    }
                });
                console.info(defer.promise);
                return defer.promise;
            }
        });

        // Properties
        Sponsor.prototype.__defineGetter__("name", function(){
            return this.get("name");
        });

        Sponsor.prototype.__defineGetter__("description", function(){
            return this.get("description");
        });

        return Sponsor;
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
    .service('artistService', function($http, $q, $log, Artists) {
        console.debug("::ENTER:: artistService...");

        this.createNewArtist = function(artist) {
            //TODO create new Artist
        };

        this.deleteArtist = function(objId) {
            //TODO delete specified artist
        };
    })
    .controller('titleController', function($log, $scope) {
        console.debug("titleController");
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
    .controller('dashboardController', function($log, $scope, dashboardService, Tours, Objects, Artists, Ads, Narrators, POIS, Sponsor) {
        $scope.dashboardTitle = 'Public Art Chicago Dashboard';
        $scope.objectsBaseImageUrl = 'https://s3.amazonaws.com/public-art-chicago/objects/';
        $scope.baseUrl = urlPrefix;
        $scope.objects = [];
        $scope.artists = [];
        $scope.ads = [];
        $scope.tours = [];
        $scope.narrators = [];
        $scope.pois = [];
        $scope.sponsors = [];
        $scope.filename = '';
        $scope.objectImages = [];

        $scope.search = function() {
            console.debug("search()...");
        };

        $scope.logout = function() {
            console.debug("logout()...");
            //alert("Logging out now!");
            location.href = 'login.html';
        };

        /**
         * Is used by ng-click directive in button element to navigate to new view and perform any processing
         */
        $scope.openObjectList = function() {
            console.debug("dashboardController.openObjectList()...");
            location.href = urlPrefix + '/dashboard.html#/objects';
        };

        $scope.openCreateObject = function() {
            console.debug("dashboardController.openCreateObject()...");
            location.href = urlPrefix + '/dashboard.html#/createObject';
        };

        $scope.openArtistList = function() {
            console.debug("dashboardController.openArtistList()...");
            location.href = urlPrefix + '/dashboard.html#/artists';
        };

        $scope.openCreateArtist = function() {
            console.debug("dashboardController.openCreateArtist()...");
            location.href = urlPrefix + '/dashboard.html#/createArtist';
        };

        $scope.openTourList = function() {
            console.debug("dashboardController.openTourList()...");
            location.href = urlPrefix + '/dashboard.html#/tours';
        };

        $scope.openCreateTour = function() {
            console.debug("dashboardController.openCreateTour()...");
            location.href = urlPrefix + '/dashboard.html#/createTour';
        };

        $scope.openPOIList = function() {
            console.debug("dashboardController.openPOIList()...");
            location.href = urlPrefix + '/dashboard.html#/pois';
        };

        $scope.openCreatePOI = function() {
            console.debug("dashboardController.openCreatePOI()...");
            location.href = urlPrefix + '/dashboard.html#/createPOI';
        };

        $scope.openAdList = function() {
            console.debug("dashboardController.openAdList()...");
            location.href = urlPrefix + '/dashboard.html#/ads';
        };

        $scope.openCreateAd = function() {
            console.debug("dashboardController.openCreateAd()...");
            location.href = urlPrefix + '/dashboard.html#/createAd';
        };

        $scope.openNarratorList = function() {
            console.debug("dashboardController.openNarratorList()...");
            location.href = urlPrefix + '/dashboard.html#/narrators';
        };

        $scope.openCreateNarrator = function() {
            console.debug("dashboardController.openCreateNarrator()...");
            location.href = urlPrefix + '/dashboard.html#/createNarrator';
        };

        $scope.underConstruction = function() {
            console.warn("This feature is under construction!");
            alert("This feature is under construction");
        }

        //-- Artists functions --

        Artists.getAllArtists().then(function(artists) {
            $scope.artists = artists;
        }, function(error) {
            console.error(error.message);
        });

        $scope.saveNewArtist = function(artist) {
            console.debug("::ENTER:: dashboardController.saveNewArtist(artist)...");
            console.debug("adding artist:  " + artist.name);
            Artists.saveNewArtist(artist);
            Artists.getAllArtists().then(function(artists) {
                $scope.artists = artists;
                $scope.openArtistList();
            }, function(error) {
                console.error(error.message);
            });
            console.debug("::EXIT:: dashboardController.saveNewArtist(artist)...")
        };

        $scope.getArtist = function(objId) {
            console.debug("::ENTER:: dashboardController.getSelectedArtist(objId)...");
            Artists.getSelectedArtist(objId);
            //TODO
            console.debug("::EXIT:: dashboardController.getSelectedArtist(objId)...");
        };

        $scope.deleteArtist = function(objId) {
            console.debug("::ENTER:: dashboardController.deleteArtist(objId)...");
            console.debug("Deletion target: " + objId);
            Artists.deleteArtist(objId);
            Artists.getAllArtists().then(function(artists) {
                $scope.artists = artists;
            }, function(error) {
                console.error(error.message);
            });
            console.debug("::EXIT:: dashboardController.deleteArtist(objId)...");
        };

        //-- Objects functions --

        Objects.getAllObjects().then(function(objects) {
            $scope.objects = objects;
            //console.debug($scope.objects);
        }, function(error) {
            console.error(error.message);
        });

        $scope.saveNewObject = function(object) {
            console.debug("::ENTER:: dashboardController.saveNewObject(object)...");
            console.debug("adding object:  " + object.name);
            console.debug(object);

            var images = new Array();
            //TODO work on getting images -- object.file --
            images.push("test.png");

            // put benefactors in Pointers {"__type":"Pointer", "className":"Sponsor", "objectId":benefactor}
            console.debug(object.benefactors);
            var sponsors = [];
            for(benefactor in object.benefactors) {
                //sponsors.push('{__type:Pointer, className:Sponsor, objectId:' + object.benefactors[benefactor] + '}');
                var sponsor = new Object();
                sponsor.__type = "Pointer";
                sponsor.className = "Sponsor"
                sponsor.objectId = object.benefactors[benefactor];
                //sponsors.push(angular.toJson({"__type":"Pointer", "className":"Sponsor", "objectId":object.benefactors[benefactor]}));
                sponsors.push(angular.toJson(sponsor));
                console.debug(angular.toJson(sponsor));
            }
            object.benefactors = sponsors;
            console.debug(object.benefactors);

            // put artists in Pointers {"__type":"Pointer", "className":"Artists", "objectId":artist}
            var artists = [];
            for(artist in object.artists) {
                console.debug("Artist Id: " + object.artists[artist]);
                //artists.push('{__type:Pointer, className:Artists, objectId:' + object.artists[artist] + '}');
                artists.push(angular.toJson({"__type":"Pointer", "className":"Artists", "objectId":object.artists[artist]}));
            }
            object.artists = artists;
            console.debug(object.artists);

            object.object_images = images;
            object.thumbnail = images[0];
            object.type = "object";
            if(!object.isDemoObject) {
                object.isDemoObject = false;
            }

            //Build location object
            object.location = new Parse.GeoPoint(object.latitude, object.longitude);
            console.debug(object.location);

            console.debug("Images are: " + object.object_images);

            //TODO temporary local test -- //
            Objects.saveNewObject(object).then(function(object){

                console.debug("Use " + object.id + " to create image links");
                object.thumbnail = $scope.buildThumbUrl(object.id);
                console.debug("The thumbnail URL is " + object.thumbnail);

                $scope.objectImages = new Array();
                for(var i = 0; i < images.length; i++)
                {
                    var imgUrl = $scope.buildSliderImageUrl(object.id, i + 1);
                    console.debug("The image url is " + imgUrl);
                    $scope.objectImages.push(imgUrl);
                }
                console.debug(object.object_images);
            });

            object.object_images = $scope.objectImages;

            /*
            Objects.getAllObjects().then(function(object) {
                $scope.objects = object;
                $scope.openObjectList()
            }, function(error) {
                console.error(error.message);
            });
            */
            console.debug(object);
            console.debug("::EXIT:: dashboardController.saveNewObject(object)...");
        };

        //-- Ads functions --

        Ads.getAllAds().then(function(ads) {
            $scope.ads = ads;
        }, function(error) {
            console.error(error.message);
        });

        $scope.saveNewAd = function(ad) {
            console.debug("::ENTER:: dashboardController.saveNewAd(ad)...");
            Ads.saveNewAd(ad);
            alert("New ad saved to database");
            console.debug("::EXIT:: dashboardController.saveNewAd(ad)...");
        };

        $scope.deleteAd = function(objId) {
            console.debug("::ENTER:: dashboardController.deleteAd(objId)...");
            Ads.deleteAd(objId);
            alert("Ad deleted");
            console.debug("::EXIT:: dashboardController.deleteAd(objId)...");
        };

        //-- Tours functions --

        Tours.getAllTours().then(function(tours) {
            $scope.tours = tours;
            console.debug($scope.tours);
        }, function(error) {
            console.error(error.message);
        });

        $scope.saveNewTour = function(tour) {
            console.debug("::ENTER:: dashboardController.saveNewTour(tour)...");
            Tours.saveNewTour(tour);
            //TODO
            alert("New tour created");
            console.debug("::EXIT:: dashboardController.saveNewTour(tour)...");
        };

        $scope.deleteTour = function(objId) {
            console.debug("::ENTER:: dashboardController.deleteTour(tour)...");
            Tours.deleteTour(objId);
            Tours.getAllTours().then(function(tours) {
                $scope.tours = tours;
                console.debug($scope.tours);
            }, function(error) {
                console.error(error.message);
            });
            console.debug("::EXIT:: dashboardController.deleteTour(tour)...");
        };

        $scope.getTour = function(objId) {
            console.debug("::ENTER:: dashboardController.getTour(tour)...");
            Tours.getTour(objId);
            //TODO
            console.debug("::EXIT:: dashboardController.getTour(tour)...");
        };

        //-- Narrators functions --

        Narrators.getAllNarrators().then(function(narrators) {
            $scope.narrators = narrators;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

        $scope.saveNewNarrator = function(narrator) {
            console.debug("::ENTER:: dashboardController.saveNewNarrator(narrator)...");
            console.debug("The name of the new narrator is " + narrator.name + " and path is " + narrator.avatarSrc);
            narrator.avatarSrc = $scope.objectsBaseImageUrl + "/default.png";
            Narrators.saveNewNarrator(narrator);
            Narrators.getAllNarrators().then(function(narrators) {
                $scope.narrators = narrators;
            }, function(error) {
                console.error(error.message);
                $log.error(error.message);
            });
            console.debug("::EXIT:: dashboardController.saveNewNarrator(narrator)...");
        }

        $scope.deleteNarrator = function(objId) {
            console.debug("::ENTER:: dashboardController.deleteNarrator(objId)...");
            Narrators.deleteNarrator(objId);
            Narrators.getAllNarrators().then(function(narrators) {
                $scope.narrators = narrators;
            }, function(error) {
                console.error(error.message);
                $log.error(error.message);
            });
            console.debug("::EXIT:: dashboardController.deleteNarrator(objId)...");
        }

        $scope.getNarrator = function(objId) {
            console.debug("::ENTER:: dashboardController.getNarrator(objId)...");
            //
            console.debug("::EXIT:: dashboardController.getNarrator(objId)...");
        }

        Sponsor.getAllSponsors().then(function(sponsor) {
            $scope.sponsors = sponsor;
        }, function(error) {
            console.error(error.message);
            $log.error(error.message);
        });

        //-- Points of Interest (POIS) --

        POIS.getAllPointsOfInterest().then(function(poi) {
            console.debug("::ENTER:: dashboardController.POIS.getAllPointsOfInterest()...");
            $scope.pois = poi;
        }, function(error) {
            console.error(error.message);
        });

        /**
         * <p>
         *     A POI is a special type of Object, so an Object will be created
         * </p>
         * @param poi
         */
        $scope.addNewPOI = function(poi) {
            console.debug("::ENTER:: dashboardController.addNewPOI(poi)...");
            poi.location = new Parse.GeoPoint(poi.latitude, poi.longitude);
            console.debug(poi.location);
            poi.type = "cultural";
            Objects.saveNewObject(poi);
            alert("Created a new Point of Interest.");
            console.debug("::EXIT:: dashboardController.addNewPOI(poi)...");
        };

        $scope.deletePOI = function(objId) {
            console.debug("::ENTER:: dashboardController.deletePOI(objId)...");
            Objects.deleteObject(objId);
            POIS.getAllPointsOfInterest().then(function(poi) {
                $scope.pois = poi;
            }, function(error) {
                console.error(error.message);
            });
            alert("The Point of Interest has been deleted!");
        };

        $scope.buildThumbUrl = function(objId) {
            var thumbUrl = $scope.objectsBaseImageUrl + objId + "/images/thumb/" + objId + "-thumb.png";
            return thumbUrl;
        };

        $scope.buildSliderImageUrl = function(objId, index) {
            console.debug("::ENTER:: dashboardController.buildSliderImageUrl(objId,index)...");
            var imageUrl = $scope.objectsBaseImageUrl + objId + "/images/slider/" + objId + "-" + index + ".jpg";
            return imageUrl;
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

        $scope.testUpload = function() {
            console.info("Selected upload...");
        };
    });
