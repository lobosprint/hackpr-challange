var app = angular.module('navTurno', []);
app.controller('myCtrl', function($scope) {
    $scope.names = ["Solicitar", "Pendientes"];
});

var app = angular.module('navPenalty', []);
app.controller('myCtrl', function($scope) {
    $scope.names = ["Pagadas", "Pendientes"];
});
