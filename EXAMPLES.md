# DGM-Survey-Dispenser

## Express Routing Helpers

### `app.route()`

```javascript
app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // maybe add a new event...
});
```

### Express Router

```javascript
var router = require('express').Router();

// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});

router.param('user', function (req, res, next, id) {
  // get our user by id
  req.user = User.getUser(id);
  next();
});

router.get('/users/:user', function (req, res, next) {
  // now we can already use req.user
});

router.route('/product')
.get(function () {})
.put(function () {})
.post(function () {})
.delete(function () {});

// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
```

## Angular Helpers

### Controllers

```javascript
/* global angular */
angular.module('moduleName.Controllers', [])
.controller('MyControllerName', function ($scope) {

  ($scope.init = function () {

  })();

});
```

### Directives

```javascript
/* global angular */
angular.module('moduleName.Directives', [])
.directive('myDirective', function () {
  return {
    restrict: 'AECM',
    scope: {
      myDirective: '=',
      myBoundVar: '=attrName'
      myFunc: '&',
      myAttr: '@'
    },
    templateUrl: '/partials/directives/my-directive.html',
    replace: true,
    transclude: true, // or 'element'
    link: function (scope, element, attrs) {
      parentCtrl.someFunc();
    }
  };
});
```

### Filters

```javascript
/* global angular */
angular.module('moduleName.Filters', [])
.filter('myFilter', function () {
  return function (input, arg1, arg2) {
    input = input || '';
    return 'hello ' + input + '!';
  };
});
```

### Services

```javascript
/* global angular */
angular.module('moduleName.Services', [])
.service('myService', function () {
  var stuff = {foo: 'bar'};
  this.getStuff = function () {
    return stuff;
  };
  this.putStuff = function (newStuff) {
    stuff = newStuff;
  };
});
```

### Factories

```javascript
/* global angular */
angular.module('moduleName.Services', [])
.factory('myService', function () {
  var stuff = {foo: 'bar'};
  return {
    getStuff: function () {
      return stuff;
    },
    putStuff: function (newStuff) {
      stuff = newStuff;
    };
  };
});
```

### Providers

```javascript
/* global angular */
angular.module('moduleName.Services', [])
.provider('myService', function () {
  this.stuff = {foo: 'bar'};

  this.$get = function () {
    var self = this;
    return {
      getStuff: function () {
        return self.stuff;
      },
      putStuff: function (newStuff) {
        self.stuff = newStuff;
      }
    };
  }
});

// then in your main module

angular.module('moduleName')
.config(function (myServiceProvider) {
  myServiceProvider.stuff = {hello: 'world'};
});
```
