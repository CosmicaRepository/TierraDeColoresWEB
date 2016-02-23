/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FacturaController', function ($scope, $http, $timeout, $uibModal, $log, $anchorScroll, $cookies, $route, facturaService, $location, $routeParams) {

    $scope._newFactura = {
        "idFactura": null,
        "cliente": null,
        "estado": "INICIADO",
        "idVendedor": null,
        "fechaCreacion": null,
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };

    $scope.barcode = "";

    $scope.clienteFactura = {
        "idCliente": null,
        "nombreCliente": "",
        "apellidoCliente": "",
        "fechaNacimiento": "",
        "dniCuit": "",
        "domicilio": "",
        "telefono": "",
        "emailCliente": "",
        "fechaCreacion": "",
        "fechaModificacion": null,
        "usuarioCreacion": null,
        "usuarioModificacion": null
    };

    $scope.listaFacturas = function () {

    };

    $scope.agregarFactura = function (factura) {
        $promesa = facturaService.add(factura);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $location.path("/factura/" + datos.data.msg);
            }
        });
    };

    $scope.detailFactura = function () {
        $scope.factura = "";
        var idFactura = $routeParams.idFactura;
        $promesa = facturaService.searchById(idFactura);
        $promesa.then(function (datos) {
            $scope.factura = datos.data;
        });
    };

    $scope.gotoAnchor = function (id) {
        $location.hash(id);
//        $anchorScroll();
    };

    $scope.selectCliente = {
        mode: 'object',
        id: 'idCliente',
        text: 'nombreCliente',
        options: function (searchText) {
            var token = $cookies.getObject('token');
            return $http({
                url: 'http://localhost:8080/cliente/searchApellido',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token.data.access_token
                },
                params: {
                    'apellidoCliente': searchText
                }
            });
        },
        select2: {
            minimumInputLength: 2
        }
    };






    $scope.open = function () {
        var control = $scope.barcode.length;
        console.log($scope.barcode);
        if (control >= 8) {
            $timeout(function timer() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ProductoController',
                    size: 'lg',
                    resolve: {
                        items: function () {
//                    return $scope.items;
                        }
                    }
                });
            }, 2000);
        }

    };


});

