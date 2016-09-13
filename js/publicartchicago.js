/**
 * Created by jamesbray on 9/12/16.
 */

var app = angular.module('publicArt', []);

app.service('loginService', function($http, $q, $log) {
    console.debug("loginService...");
    //
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
    //
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
    };
});