/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('_tipoController', ['$scope', 'ngTableParams', 'createDialog', '$route', '$timeout', '$cookies', 'Upload', '$location', '_tipoService', 'factoryCache', '$rootScope', function ($scope, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _tipoService, factoryCache, $rootScope) {

        $scope._tipo = {
            "idTipo": null,
            "nombreTipo": "",
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": "",
            "fechaModificacion": null
        };

        $scope.listaTipo = function () {
            $scope.tipos = "";
            $promesa = _tipoService.getListaTipo();
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $scope.tipos = datos.data;
                } else {
                    alert("error");
                }
            });
        };

        $scope.agregarTipo = function (tipo) {
            $promesa = _tipoService.addTipo(tipo);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.eliminarTipo = function (tipo) {
            $promesa = _tipoService.deleteTipo(tipo);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

        $scope.seleccionarTipo = function (tipo) {
            $scope.__tipo = tipo;
        };

        $scope._modificarTipo = function (tipo) {
            $promesa = _tipoService.updateTipo(tipo);
            $promesa.then(function (datos) {
                if (datos.status === 200) {
                    $route.reload();
                } else {
                    alert("error");
                }
            });
        };

    }]);


