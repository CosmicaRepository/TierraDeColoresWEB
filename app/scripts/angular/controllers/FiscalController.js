/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FiscalController', function ($scope, toaster, metodoPagoFacturaService, $rootScope, $window, ngDialog, $state, $stateParams, fiscalService, $cookies, facturaService) {

    $scope.comprobanteFiscal = null;
    $scope.vendedorFiscal = null;

    $scope.listaVendedores = function () {
        $scope.vendedores = "";
        $promesa = facturaService.getVendedores();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $scope.vendedores = datos.data;
            }
        });
    };

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

    $scope.optImprimir = function () {
        ngDialog.open({
            template: 'views/modals/tipo-factura.html',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            showClose: false,
            controller: 'FiscalController',
            closeByDocument: false,
            closeByEscape: false
//            preCloseCallback: function (value) {
//                var nestedConfirmDialog = ngDialog.openConfirm({
//                    template: 'views/modals/advertencia-cierre.html',
//                    className: 'ngdialog-theme-advertencia',
//                    showClose: false,
//                    closeByDocument: false,
//                    closeByEscape: false
//                });
//                return nestedConfirmDialog;
//            }
        });
    };

    $scope.confirmarImpresion = function (comprobanteFiscal, vendedorFiscal) {
        $rootScope.toPrint = comprobanteFiscal;
        $rootScope.vendedor = vendedorFiscal;
        ngDialog.open({
            template: 'views/modals/confirmar-impresion.html',
            className: 'ngdialog-theme-advertencia',
            showClose: false,
            controller: 'FiscalController',
            closeByDocument: false,
            closeByEscape: false
        });
    };


    $scope.imprimir = function () {
        var control = 0;
        var idFactura = $stateParams.idFactura;
        $factura = facturaService.searchById(idFactura);
        $factura.then(function (datos) {
            var compare = datos.data;
            $pago = metodoPagoFacturaService.getListaPagoFactura(idFactura);
            $pago.then(function (datos) {
                angular.forEach(datos.data, function (value, key) {
                    control = control + parseFloat(value.montoPago);
                });
                if (control === compare.total) {
                    switch (parseInt($rootScope.toPrint)) {
                        case 1:
                            $scope.$emit('imprimitTicket', {});
                            break;
                        case 2:
                            break;
                    }
                } else {
                    ngDialog.closeAll();
                    toaster.pop({
                        type: 'warning',
                        title: 'Advertencia',
                        body: '¡Aun hay saldo por pagar!',
                        showCloseButton: false
                    });
                }

            });
        });

    };

    $scope.$on('imprimitTicket', function () {
        ngDialog.closeAll();
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
                            $scope.facturaImpresa.tipoFactura = "ticket";
                            $scope.facturaImpresa.estado = "CONFIRMADO";
                            $scope.facturaImpresa.idVendedor = $rootScope.vendedor;
                            $update = facturaService.update($scope.facturaImpresa);
                            $update.then(function (datos) {
                                if (datos.status === 200) {
                                    toaster.pop({
                                        type: 'success',
                                        title: 'Exito',
                                        body: 'Ticket impreso.',
                                        showCloseButton: false
                                    });
                                    $rootScope.factura = $scope.facturaImpresa;
                                }
                            });
                        });
                    }
                });
            }
        });
    });




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