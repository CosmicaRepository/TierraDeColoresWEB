/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.service('_loginService', function ($http, $q, $cookies) {

    this.getAccess = function (Auth) {
        var datosRecu = null;
        var deferred = $q.defer();
        var uri = 'http://localhost:8080/oauth/token';
        $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Basic bmF0dXJhYXBwOjEyMzQ1Ng==',
                'Content-type': 'application/json'
            },
            params: {
                username: Auth.username,
                password: Auth.password,
                grant_type: 'password'
            }
        }).then(function successCallback(response) {
            datosRecu = response;
            deferred.resolve(datosRecu);
        }, function errorCallback(response) {
            datosRecu = response;
            deferred.resolve(datosRecu);
        });
        return deferred.promise;
    };

    this.logoutApi = function (Token) {
        var uri = 'http://localhost:8080/oauth/logout';
        var request = $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + Token,
                'Content-type': 'application/json'
            }
        });
        return request;
    };

    this.refreshToken = function (Token) {
        var uri = 'http://localhost:8080/oauth/token';
        var request = $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + Token,
                'Content-type': 'application/json'
            },
            params: {
                refresh_token: 'Bearer ' + Token,
                grant_type: 'refresh_token'}
        });
        return request;
    };
});


