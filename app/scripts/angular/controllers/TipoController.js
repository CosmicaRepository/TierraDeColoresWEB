/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('TipoController', function ($scope, $state, toaster, ngTableParams, $route, $timeout, $cookies, Upload, $location, _tipoService, factoryCache, $rootScope) {

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
                toaster.pop('success', 'Exito', 'Tipo agregado con exito.');
                $timeout(function timer() {
                    $state.go($state.current, {}, {reload: true});
                }, 1000);
            } else {
                alert("error");
            }
        });
    };

    $scope.eliminarTipo = function () {
        $promesa = _tipoService.deleteTipo($scope.__tipo);
        $promesa.then(function (datos) {
            if (datos.status === 200) {                
                toaster.pop('success', 'Exito', 'Tipo eliminado con exito.');
                $timeout(function timer() {
                    $state.go($state.current, {}, {reload: true});
                }, 1000);
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
                toaster.pop('success', 'Exito', 'Tipo modificado con exito.');
                $timeout(function timer() {
                    $state.go($state.current, {}, {reload: true});
                }, 1000);
            } else {
                alert("error");
            }
        });
    };

});


