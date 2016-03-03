/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.service('UsuarioService', function ($http, $q, $rootScope, $cookies, factoryConnection) {

    this.getListaUsuarios = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = $rootScope.resource + 'usuarios/list';
        $http({
            url: uri,
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-type': 'application/json'
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

    this.getDetailUser = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var url = 'http://localhost:8080/usuarios/detail';
        $http({
            url: url,
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-type': 'application/json'
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

    this.addUsuario = function (usuario) {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = $rootScope.resource + 'usuarios/addUsuario';
        $http({
            url: uri,
            method: 'post',
            data: angular.toJson(usuario),
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-type': 'application/json'
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

    this.updateUsuario = function (usuario) {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = $rootScope.resource + 'usuarios/updateUsuario';
        $http({
            url: uri,
            method: 'post',
            data: angular.toJson(usuario),
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-type': 'application/json'
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

    this.changePassword = function (usuario) {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = $rootScope.resource + 'usuarios/changePassword';
        $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-Type': 'application/json'
            },
            params: {
                oldPw: usuario.old,
                newPw: usuario.rep,
                repPw: usuario.new
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

    this.changeStatus = function (status, usuarios) {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = $rootScope.resource + 'usuarios/changeStatus';
        $http({
            url: uri,
            method: 'post',
            data: angular.toJson(usuarios),
            headers: {
                'Authorization': 'Bearer ' + token.data.access_token,
                'Content-Type': 'application/json'
            },
            params: {
                status: status
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
});

