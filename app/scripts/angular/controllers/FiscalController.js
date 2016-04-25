/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('FiscalController', function ($scope, toaster, $rootScope, $window, ngDialog, $state, $stateParams, fiscalService, $cookies, facturaService) {

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

    $scope.optImprimir = function (tipoComprobante) {
        ngDialog.open({
            template: 'tipoFactura',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            showClose: false,
            controller: 'FiscalController',
            closeByDocument: false,
            closeByEscape: false,
//            preCloseCallback: function (value) {
//                var nestedConfirmDialog = ngDialog.openConfirm({
//                    template: 'advertencia',
//                    className: 'ngdialog-theme-advertencia',
//                    showClose: false,
//                    closeByDocument: false,
//                    closeByEscape: false
//                });
//                return nestedConfirmDialog;
//            }
        });
    };

    $scope.confirmarImpresion = function (tipoComprobante) {
        $rootScope.toPrint = tipoComprobante;
        ngDialog.open({
            template: 'confirmarImpresion',
            className: 'ngdialog-theme-advertencia',
            showClose: false,
            controller: 'FiscalController',
            closeByDocument: false,
            closeByEscape: false
        });
    };


    $scope.imprimir = function () {
        switch (parseInt($rootScope.toPrint)) {
            case 1:
                $scope.$emit('imprimitTicket', {});
                break;
            case 2:
                break;
        }
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
                    console.log(datos);
                    if (datos.status === 200) {
                        $ticket = fiscalService.ticket(datos.data);
                        $ticket.then(function (datos) {
                            console.log(datos);
                            var lastString = datos.data[datos.data.length - 1];
                            var split = lastString.split("|");
                            numeracion = split[split.length - 1];
                            $scope.facturaImpresa.numeracion = numeracion;
                            $scope.facturaImpresa.tipoFactura = "ticket";
                            $scope.facturaImpresa.estado = "CONFIRMADO";
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