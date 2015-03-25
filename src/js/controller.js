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

  $scope.data = window.industryData;

  var lastSort = null;
  var direction = 1;

  $scope.sortOn = function(key, e) {
    if (lastSort == key) {
      direction *= -1;
    } else {
      direction = e && e.target.classList.contains("text") ? 1 : -1;
    }
    lastSort = key;
    $scope.data = window.industryData.sort(function(a, b) {
      a = get(a, key);
      b = get(b, key);
      if (a == b) return 0;
      return a < b ? direction * -1 : direction;
    });
    $scope.expanded = true;
  };

  $scope.sortOn("production.lowest");
  $scope.data = $scope.data.slice(0, 10);

  $scope.toggleFull = function() {
    $scope.data = window.industryData;
    $scope.expanded = true;
  }

}]);