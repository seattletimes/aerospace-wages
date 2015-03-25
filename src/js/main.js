//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("component-responsive-frame/child");

var app = require("./application");
require("./controller");

angular.bootstrap(document.body, [app.name]);

//clear CSS-only tooltips
document.body.addEventListener("click", function(e) {
  if (e.target.className !== "bar-focus") {
    var focused = document.querySelector("input.bar-focus:checked");
    if (focused) focused.checked = false;
  }
});