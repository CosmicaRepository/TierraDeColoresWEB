/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FacturaController',
        ['$scope', '$rootScope', 'NgTableParams', '_productoService', '$http', '$timeout', '$uibModal', '$cookies', '$route', 'facturaService', '$location', '$routeParams',
            function ($scope, $rootScope, NgTableParams, _productoService, $http, $timeout, $uibModal, $cookies, $route, facturaService, $location, $routeParams) {

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

                $scope.totalCompra = 0;

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
                    $rootScope.productosBarcode = "";
                    var control = $scope.barcode.length;
                    if (control >= 8) {
                        $promesa = _productoService.searchByBarcode($scope.barcode);
                        $promesa.then(function (datos) {
                            $rootScope.productosBarcode = datos.data;
                        });
                        $timeout(function timer() {
                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'searchResultados.html',
                                controller: 'ModalController',
                                size: 'lg',
                                resolve: {}
                            });
                        }, 2000);
                    }
                };
                $scope.searchBarcode = function () {

                };

                $scope.listaDetalleFactura = function () {
                    var idFacturaDetalle = $routeParams.idFactura;
                    $scope.detalleFacturas = "";
                    $promesa = facturaService.getDetalleFacturaList(idFacturaDetalle);
                    $promesa.then(function (datos) {
                        $scope.detalleFacturas = datos.data;
                        var data = datos.data;
                        angular.forEach(data, function (value, key) {
                            value.idDetalleFactura = key + 1; //posiblemente a eliminar, de mas
                            $scope.totalCompra = parseInt($scope.totalCompra) + parseInt(value.totalDetalle);
                        });
                        $scope.tableParams = new NgTableParams({
                            page: 1,
                            count: 5
                        }, {
                            total: data.length,
                            getData: function (params) {
                                data = $scope.detalleFacturas;
                                params.total(data.length);
                                if (params.total() <= ((params.page() - 1) * params.count())) {
                                    params.page(1);
                                }
                                return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }});
                    });
                };

                $rootScope.$on('ReloadTable', function () {
                    var idFacturaDetalle = $routeParams.idFactura;
                    $timeout(function timer() {
                        facturaService.getDetalleFacturaList(idFacturaDetalle).then(function (datos) {
                            $scope.detalleFacturas = datos.data;
                            $scope.totalCompra = 0;
                            angular.forEach(datos.data, function (value, key) {
                                value.idDetalleFactura = key; //posiblemente a eliminar, de mas
                                $scope.totalCompra = parseInt($scope.totalCompra) + parseInt(value.totalDetalle);
                            });
                            $scope.tableParams.reload();
                        });
                    }, 1000);
                });


                $scope.getCliente = function (val) {
                    var token = $cookies.getObject('token');
                    return $http({
                        url: 'http://localhost:8080/cliente/searchApellido',
                        method: 'post',
                        headers: {
                            'Authorization': 'Bearer ' + token.data.access_token
                        },
                        params: {
                            'apellidoCliente': val
                        }
                    }).then(function (response) {
                        return response.data.map(function (item) {
                            return item;
                        });
                    });
                };
            }]);

