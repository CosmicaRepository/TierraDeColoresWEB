/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('ModalController',
        ['$scope', '$stateParams', '_productoService', 'toaster', 'facturaService', '$routeParams', '$uibModalInstance', '$uibModal', '$timeout', '$rootScope', 'facturaService',
            function ($scope, $stateParams, _productoService, toaster, facturaService, $routeParams, $uibModalInstance, $uibModal, $timeout, $rootScope, facturaService) {

                $scope._detalleFactura = {
                    "idDetalleFactura": null,
                    "factura": null,
                    "producto": null,
                    "cantidadDetalle": null,
                    "totalDetalle": null,
                    "descuentoDetalle": null,
                    "estadoDetalle": true,
                    "usuarioCreacion": null,
                    "usuarioModificacion": null,
                    "fechaCreacion": null,
                    "fechaModificacion": null
                };
                $scope.toUpdateFactura = "";
                $scope.modalBarcode = "";
                $scope.percent = "";
                $scope.mount = "";

                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.addProductoDetalle = function (productoBarcode) {
                    $rootScope.productoSelected = productoBarcode;
                    $timeout(function timer() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'addProductoFactura.html',
                            controller: 'ModalController',
                            size: 'sm',
                            resolve: {}
                        });
                    }, 1000);
                };

                $scope.buscarModal = function (barcode) {
                    $promesa = _productoService.searchByBarcode(barcode);
                    $promesa.then(function (datos) {
                        toaster.pop('success', 'Encontrado/s', 'Se encontraron productos');
                        $rootScope.productosBarcode = datos.data;
                    }).catch(function (fallback) {
                        toaster.pop('error', 'Error', 'No se han encontrado productos');
                    });
                };

                $scope.addDetalleFacturaModal = function () {
                    var idFactura = $stateParams.idFactura;
                    if ($scope._detalleFactura.cantidadDetalle !== null) {
                        var descuento = 0;
                        if ($scope.percent !== "") {
                            descuento = ($rootScope.productoSelected.precioVenta * $scope.percent) / 100;
                        }
                        if ($scope.mount !== "") {
                            descuento = $scope.mount;
                            console.log(descuento);
                        }
                        if ($rootScope.productoSelected.cantidadTotal >= $scope._detalleFactura.cantidadDetalle) {
                            $promesa = facturaService.searchById(idFactura);
                            $promesa.then(function (datos) {
                                $scope._detalleFactura.factura = datos.data;
                                $scope._detalleFactura.producto = $rootScope.productoSelected;
                                $scope._detalleFactura.descuentoDetalle = descuento;
                                $addDetalle = facturaService.addDetalleFactura($scope._detalleFactura);
                                $addDetalle.then(function (datos) {
                                    toaster.pop('success', 'Exito', 'Se ha agregado detalle nuevo.');
                                });
                                $timeout(function timer() {
                                    $scope.toUpdateFactura = datos.data;
                                    $listDetalles = facturaService.getDetalleFacturaList(idFactura);
                                    $listDetalles.then(function (datos) {
                                        console.log(datos);
                                        var totalUpdate = 0;
                                        angular.forEach(datos.data, function (value, key) {
                                            totalUpdate = parseInt(totalUpdate) + parseInt(value.totalDetalle);
                                        });
                                        $scope.toUpdateFactura.total = totalUpdate;
                                        console.log($scope.toUpdateFactura);
                                        $updateTotal = facturaService.update($scope.toUpdateFactura);
                                        $updateTotal.then(function (datos) {
                                            $updated = facturaService.searchById(idFactura);
                                            $updated.then(function (datos) {
                                                $rootScope.factura = datos.data;
                                            });
                                        });
                                        $uibModalInstance.close();
                                        $rootScope.$emit('ReloadTable', {});
                                    });
                                }, 2000);
                            });
                        } else {
                            toaster.pop('error', 'Error.', 'El stock actual es insuficiente a la cantidad ingresada.');
                        }
                    } else {
                        toaster.pop('error', 'Error', 'La cantidad no puede estar vacia.');
                    }
                };


                $rootScope.$on('ReloadTable', function () {
                    $timeout(function timer() {
                        $uibModalInstance.close();
                    }, 1000);
                });

            }]);

