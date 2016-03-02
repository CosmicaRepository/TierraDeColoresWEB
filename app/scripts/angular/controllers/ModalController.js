/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('ModalController', ['$scope', 'facturaService', '$routeParams', '$uibModalInstance', '$uibModal', '$timeout', '$rootScope', 'facturaService',
    function ($scope, facturaService, $routeParams, $uibModalInstance, $uibModal, $timeout, $rootScope, facturaService) {

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

        $scope.close = function () {
            $uibModalInstance.close();
        };
        $scope.addProductoDetalle = function (productoBarcode, factura) {
            $rootScope.productoSelected = productoBarcode;
            $timeout(function timer() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'addProductoFactura.html',
                    controller: 'ModalController',
                    size: 'md',
                    resolve: {}
                });
            }, 1000);
        };

        $scope.addDetalleFactura = function () {
            var idFactura = $routeParams.idFactura;
            $promesa = facturaService.searchById(idFactura);
            $promesa.then(function (datos) {
                $scope._detalleFactura.factura = datos.data;
                $scope._detalleFactura.producto = $rootScope.productoSelected;
                $promesa = facturaService.addDetalleFactura($scope._detalleFactura);
                $promesa.then(function (datos) {
                    $uibModalInstance.close();
                });
                $scope.toUpdate = datos.data;
                $scope.toUpdate.total = parseInt($scope.toUpdate.total) + parseInt($rootScope.productoSelected.precioVenta) * $scope._detalleFactura.cantidadDetalle;
                $updateTotal = facturaService.update($scope.toUpdate);
                $updateTotal.then(function (datos) {
                    $updated = facturaService.searchById(idFactura);
                    $updated.then(function (datos) {
                        $rootScope.factura = datos.data;
                    });
                });
            });
            $rootScope.$emit('ReloadTable', {});
        };


    }]);

