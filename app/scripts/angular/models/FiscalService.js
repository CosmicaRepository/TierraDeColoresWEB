/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.service('fiscalService', function ($http, $q, $cookies) {

    var Auth = {
        'usuario': 'AFIP_SMH/P-441F',
        'password': 'T13RR4$7j15vker4L-L'
    };

    this.printer = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        var uri = 'http://localhost:8085/HasarPrinterAPI-0.5/oauth/token';
        $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Basic U1RBVElPTl9TTUgvUC00NDFGOjQwMTNGRFRZMzAyMw==',
                'Content-type': 'application/json'
            },
            params: {
                username: Auth.usuario,
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
    
    this.connection = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        var uri = 'http://localhost:8085/HasarPrinterAPI-0.5/fiscal/connection';
        var tk = $cookies.get('ptk');
        $http({
            url: uri,
            method: 'post',
            headers: {
                'Authorization': 'Bearer '+tk,
                'Content-type': 'application/json'
            },
            params: {
                username: Auth.usuario,
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


    this.ticket = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        var token = $cookies.getObject('token');
        var uri = 'http://localhost:8081/ticket/test';
        $http({
            url: uri,
            method: 'post',
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

});

