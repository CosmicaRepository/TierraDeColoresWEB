/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FacturaController',
        ['$scope', '$rootScope', 'NgTableParams', '_productoService', '$http', '$timeout', '$uibModal', '$cookies', '$route', 'facturaService', '$location', '$routeParams', 'metodoPagoFacturaService', 'medioPagoService', 'entidadBancariaService', 'planPagoService', 'tarjetaService',
            function ($scope, $rootScope, NgTableParams, _productoService, $http, $timeout, $uibModal, $cookies, $route, facturaService, $location, $routeParams, metodoPagoFacturaService, medioPagoService, entidadBancariaService, planPagoService, tarjetaService) {

                $scope._newFactura = {
                    "idFactura": null,
                    "cliente": null,
                    "estado": "INICIADO",
                    "idVendedor": null,
                    "fechaCreacion": null,
                    "fechaModificacion": null,
                    "usuarioCreacion": null,
                    "usuarioModificacion": null,
                    "total": null
                };
                $rootScope.factura = "";
                $scope._metodoPago = {
                    "idMetodoPagoFactura": null,
                    "planPago": null,
                    "factura": null,
                    "montoPago": null,
                    "estado": true,
                    "fechaCreacion": null,
                    "fechaModificacion": null,
                    "usuarioCreacion": null,
                    "usuarioModificacion": null
                };

                $scope.barcode = "";
                $scope.montoPago = "";
                $scope.totalCompra = 0;
                $scope.totalPago = 0;
                $scope.entidadPago = "";
                $scope.planPago = null;
                $scope.tarjetasPago = "";
                $scope.mediosPago = "";
                $scope.disableSelectEntidades = true;
                $scope.disableSelectTarjeta = true;
                $scope.disableSelectMetodo = true;

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

                $scope.agregarFactura = function (factura) {
                    $promesa = facturaService.add(factura);
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            $location.path("/factura/" + datos.data.msg);
                        }
                    });
                };

                $scope.detailFactura = function () {
                    var idFactura = $routeParams.idFactura;
                    $promesa = facturaService.searchById(idFactura);
                    $promesa.then(function (datos) {
                        $rootScope.factura = datos.data;
                    });
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

                $scope.listaDetalleFactura = function () {
                    var idFacturaDetalle = $routeParams.idFactura;
                    $scope.detalleFacturas = "";
                    $promesa = facturaService.getDetalleFacturaList(idFacturaDetalle);
                    $promesa.then(function (datos) {
                        $scope.detalleFacturas = datos.data;
                        var data = datos.data;
                        angular.forEach(data, function (value, key) {
//                            value.idDetalleFactura = key + 1; //posiblemente a eliminar, de mas
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
//                                value.idDetalleFactura = key; //posiblemente a eliminar, de mas
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

                $scope.listaMetodoPagoFactura = function () {
                    $scope.metodoPagos = "";
                    var idFactura = $routeParams.idFactura;
                    $promesa = metodoPagoFacturaService.getListaPagoFactura(idFactura);
                    $promesa.then(function (datos) {
                        $scope.metodoPagos = datos.data;
                        var data = datos.data;
                        angular.forEach(datos.data, function (value, key) {
                            $scope.totalPago = parseInt($scope.totalPago) + parseInt(value.montoPago);
                        });
                        $scope.tableMetodos = new NgTableParams({
                            page: 1,
                            count: 5
                        }, {
                            total: data.length,
                            getData: function (params) {
                                data = $scope.metodoPagos;
                                params.total(data.length);
                                if (params.total() <= ((params.page() - 1) * params.count())) {
                                    params.page(1);
                                }
                                return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            }});
                    });
                };


                /**
                 * Modulo carga metodo de pago, correspondientes listados
                 * @returns {undefined}
                 */
                $scope.listaMedioPago = function () {
                    $promesa = medioPagoService.getAll();
                    $promesa.then(function (datos) {
                        $scope.mediosPagos = datos.data;
                    });
                };
                $scope.listaEntidades = function () {
                    $promesa = entidadBancariaService.getAll();
                    $promesa.then(function (datos) {
                        $scope.entidades = datos.data;
                    });
                };
                $scope.listaPlanesPago = function () {
                    $promesa = planPagoService.getAll();
                    $promesa.then(function (datos) {
                        $scope.planesPago = datos.data;
                    });
                };
                $scope.listaTarjetas = function () {
                    $promesa = tarjetaService.getAll();
                    $promesa.then(function (datos) {
                        $scope.tarjetas = datos.data;
                    });
                };

                $scope.$watchGroup(['mediosPago', 'entidadPago', 'tarjetasPago', 'planPago'], function (newValues, oldValues) {
//                    if (typeof (newValues[1]) !== 'undefined' || newValues[1] === "") {
//                        $promesa = tarjetaService.getEntidades(newValues[1].idEntidadMonetaria);
//                        $promesa.then(function (datos) {
////                            $scope.tarjetasPago = datos.data;
//                        });
//                    }
                });

                $scope.$watch('mediosPago', function (newValue, oldValue) {
                    if (newValue.nombrePago === 'CONTADO') {
                        $scope.disableSelectEntidades = true;
                        $scope.disableSelectTarjeta = true;
                        $scope.disableSelectMetodo = true;
                        $scope.entidadPago = "";
                        $scope.planPago = "";
                        $scope.tarjetasPago = "";
                    }
                    if (newValue.nombrePago === 'CREDITO' || newValue.nombrePago === 'DEBITO') {
                        $scope.disableSelectEntidades = false;

                    }
                });

                $scope.busquedaTarjeta = function () {
                    $promesa = tarjetaService.getEntidades($scope.entidadPago.idEntidadMonetaria, $scope.mediosPago.idMedioPago);
                    $promesa.then(function (datos) {
                        $scope.disableSelectTarjeta = false;
                        $scope.tarjetas = datos.data;
                    });
                };

                $scope.busquedaPlanByTarjeta = function () {
                    console.log($scope.tarjetasPago);
                    $promesa = planPagoService.searchByTarjeta($scope.tarjetasPago.idTarjeta);
                    $promesa.then(function (datos) {
                        console.log(datos);
                        $scope.planesPago = datos.data;
                        $scope.disableSelectMetodo = false;
                    });
                };

                $scope.agregarMetodoPago = function () {
                    var idFactura = $routeParams.idFactura;
                    $promesa = facturaService.searchById(idFactura);
                    $promesa.then(function (datos) {
                        $scope._metodoPago.factura = datos.data;
                        console.log($scope.mediosPago.idMedioPago);
                        if ($scope.mediosPago.idMedioPago !== 1) {
                            $scope._metodoPago.planPago = $scope.planPago;
                        } else {
                            $scope._metodoPago.planPago = null;
                        }
                        if ($scope.montoPago === "") {
                            alert("el monto no puede ser 0");
                        } else {
                            $scope._metodoPago.montoPago = $scope.montoPago;
                            $prom = metodoPagoFacturaService.addMetodoPago($scope._metodoPago);
                            $prom.then(function (datos) {
                                $recharge = metodoPagoFacturaService.getListaPagoFactura(idFactura);
                                $recharge.then(function (datos) {
                                    angular.forEach(datos.data, function (value, key) {
                                        console.log(value);
                                        $scope.totalPago = parseInt($scope.totalPago) + parseInt(value.montoPago);
                                    });
                                    $scope.metodoPagos = datos.data;
                                    $scope.tableMetodos.reload();
                                    $scope.montoPago = "";
                                    $scope.planPago = null;
                                    $scope.tarjetasPago = "";
                                    $scope.entidadPago = "";
                                    $scope.mediosPago = "";
                                    $scope.disableSelectEntidades = true;
                                    $scope.disableSelectTarjeta = true;
                                    $scope.disableSelectMetodo = true;
                                });
                            });
                        }
                    });
                };

                $scope.$watch('totalPago', function (newValue, oldValue) {
                    $scope.finalizar = true;
                    $scope.agregarMetodo = false;
                    console.log(newValue);
                    console.log($rootScope.factura.total);
                    if (newValue.totalPago >= $rootScope.factura.total) {
                        console.log($rootScope.factura.total);
                        if ($rootScope.factura.total > 0) {
                            $scope.finalizar = false;
                            $scope.agregarMetodo = true;
                        }
                    }
                });

            }]);

