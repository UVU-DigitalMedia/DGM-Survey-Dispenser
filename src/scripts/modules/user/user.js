angular.module('user', [])
.factory('user', function ($http) {
  var baseUser = '/v1/user';
  var baseAuth = '/v1/auth';

  var roleData = $http.get(baseAuth + '/roles');

  return {
    create: function (data) {
      var url = baseUser;
      return $http.post(url, data);
    },
    read: function (id) {
      var url = baseUser;
      if (id) { url += '/' + id; }
      return $http.get(url);
    },
    update: function (user) {
      var url = baseUser + '/' + user.id;
      return $http.put(url, user);
    },
    delete: function (id) {
      var url = baseUser + '/' + id;
      return $http.delete(url);
    },
    login: function (email, password) {
      var url = baseAuth + '/login';
      return $http.post(url, {
        email: email,
        password: password
      });
    },
    logout: function () {
      var url = baseAuth + '/logout';
      return $http.post(url);
    },
    roles: roleData.then(function (data) {
      return data.roles;
    }),
    accessLevels: roleData.then(function (data) {
      return data.accessLevels;
    })
  };
});
