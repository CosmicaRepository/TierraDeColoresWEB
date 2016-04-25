/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FiscalController', function ($scope, $window, ngDialog, $state, $stateParams, fiscalService, $cookies, facturaService) {


    $scope.accesoFiscal = function () {
        var tk = $cookies.get('ptk');
        if (angular.isUndefined(tk)) {
            $printer = fiscalService.printer();
            $printer.then(function (datos) {
                if (datos.status === 200) {
                    $cookies.put('ptk', datos.data.access_token);
                    $scope.printer = false;
                } else {
                    $scope.printer = true;
                }
            });
        } else {
            $printerState = fiscalService.connection();
            $printerState.then(function (datos) {
                if (datos.status !== 200) {
                    $scope.printer = true;
                    $printer = fiscalService.printer();
                    $printer.then(function (datos) {
                        if (datos.status === 200) {
                            $cookies.put('ptk', datos.data.access_token);
                            $scope.printer = false;
                        } else {
                            $scope.printer = true;
                        }
                    });
                } else {
                    $scope.printer = false;
                }
            });
        }
    };

    $scope.imprimir = function (tipoComprobante) {
        var numeracion = null;
        $scope.facturaImpresa = null;
        var idFactura = $stateParams.idFactura;
        $factura = facturaService.searchById(idFactura);
        $factura.then(function (datos) {
            if (datos.status === 200 && datos.data.numeracion === null) {
                $scope.facturaImpresa = datos.data;
                $detalles = facturaService.getDetalleFacturaList(idFactura);
                $detalles.then(function (datos) {
                    if (datos.status === 200) {
                        $ticket = fiscalService.ticket(datos.data);
                        $ticket.then(function (datos) {
                            var lastString = datos.data[datos.data.length - 1];
                            var split = lastString.split("|");
                            numeracion = split[split.length - 1];
                            $scope.facturaImpresa.numeracion = numeracion;
                            $scope.facturaImpresa.tipoFactura = tipoComprobante;
                            $update = facturaService.update($scope.facturaImpresa);
                            $update.then(function (datos) {
                                if (datos.status === 200) {
                                    alert("exito");
                                }
                            });
                        });
                    }
                });
            }
        });
        ngDialog.open({
            template: 'tipoFactura',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            showClose: false,
            closeByDocument: false,
            closeByEscape: false,
            preCloseCallback: function (value) {
                var nestedConfirmDialog = ngDialog.openConfirm({
                    template: 'advertencia',
                    className: 'ngdialog-theme-advertencia',
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false
                });
                return nestedConfirmDialog;
            }
        });
    };


    /**
     * Funcion para evitar cierre o cambio de pagina
     * @returns {String}
     */
    $scope.onExit = function () {
        return ('bye bye');
    };
//    $window.onbeforeunload = $scope.onExit;
    $scope.$on('$stateChangeStart', function (event) {
        var answer = confirm("¿Estas seguro de que quieres salir?");
        if (!answer) {
            event.preventDefault();
        }
    });
});