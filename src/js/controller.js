var app = require("./application");

var get = function(obj, path) {
  path = path.split(".");
  var segment;
  var value = obj;
  while(segment = path.shift()) {
    value = value[segment];
  }
  return value;
};

app.controller("TableController", ["$scope", function($scope) {

  var all = window.industryData;
  var some = window.industryData.filter(row => row.featured).sort((a, b) => b.production.lowest - a.production.lowest);

  $scope.data = some;

  var lastSort = null;
  var direction = 1;

  $scope.sortOn = function(key, e) {
    if (lastSort == key) {
      direction *= -1;
    } else {
      direction = e && e.target.classList.contains("text") ? 1 : -1;
    }
    lastSort = key;
    $scope.data = all.sort(function(a, b) {
      a = get(a, key);
      b = get(b, key);
      if (a == b) return 0;
      return a < b ? direction * -1 : direction;
    });
    $scope.expanded = true;
  };

  $scope.expanded = false;

  $scope.toggleFull = function() {
    $scope.expanded = !$scope.expanded;
    if ($scope.expanded) {
      lastSort = null;
      $scope.sortOn("production.lowest");
    } else {
      $scope.data = some;
    }
  };

  $scope.showFeatured = function() {
    $scope.expanded = false;
    $scope.data = some;
  };

  $scope.showAll = function() {
    $scope.expanded = true;
    lastSort = null;
    $scope.sortOn("production.lowest");
  }

}]);