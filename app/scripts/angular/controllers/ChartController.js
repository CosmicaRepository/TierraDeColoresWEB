/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('ChartController', function ($scope, chartService, facturaService, medioPagoService) {

    $scope.oneAtATime = true;
    /**
     * configuracion chart ventas por vendedor
     */
    $scope.chartConfig = {
        options: {
            subtitle: {
                text: 'Cantidad de ventas por vendedor.'
            },
            chart: {
                type: "areaspline"
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    fillOpacity: 0.5
                },
                column: {
                    stacking: 'normal'
                },
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: false
            }
        },
        series: [],
        title: {
            text: ""
        },
        credits: {
            "enabled": false
        },
        legend: {
            enabled: false
        },
        loading: false,
        useHighStocks: false,
        exporting: true,
        xAxis: [{
                type: 'datetime',
                title: {text: 'Dias de la semana.'}
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Cantidad.'}
            }]
    };
    /**
     * metodo ventas por vendedor
     * @returns {undefined}
     */
    $scope.estadisticasVentas = function () {
        $scope.estadistica = {
            'nombre': '',
            'apellido': '',
            'cantidad': 0
        };
        $scope.cantidadVendedor = [];
        $scope.chartConfig.loading = true;
        $vendedores = facturaService.getVendedores();
        $vendedores.then(function (datos) {
            var colors = ['yellowgreen', 'purple', 'crimson', 'orange', 'yellow', 'red', 'green', 'pink', 'blue', 'cyan'];
            angular.forEach(datos.data, function (value, key) {
                $scope.sum = 0;
                $estadistica = chartService.getEstadisticaVendedor(value.idUsuario);
                $estadistica.then(function (datos) {
                    if (datos.status === 200) {
                        $scope.chartConfig.series.push({
                            id: value.idUsuario,
                            data: [
                                [datos.data[0].date, datos.data[0].value],
                                [datos.data[1].date, datos.data[1].value],
                                [datos.data[2].date, datos.data[2].value],
                                [datos.data[3].date, datos.data[3].value],
                                [datos.data[4].date, datos.data[4].value],
                                [datos.data[5].date, datos.data[5].value],
                                [datos.data[6].date, datos.data[6].value]
                            ],
                            name: value.nombre,
                            type: "areaspline",
                            dashStyle: "",
                            color: colors[key]
                        });
                    }
                    angular.forEach(datos.data, function (value, key) {
                        $scope.sum = parseInt($scope.sum) + parseInt(value.value);
                    });
                    $scope.cantidadVendedor.push({
                        nombre: value.nombre,
                        apellido: value.apellido,
                        cantidad: $scope.sum
                    });
                    $scope.sum = 0;
                });
            });
            $scope.chartConfig.loading = false;
        });
    };
    /***************************************************/

    /**
     * configuracion chart ventas monto
     */
    $scope.chartConfigVentas = {
        options: {
            subtitle: {
                text: 'Monto de ventas por vendedor.'
            },
            chart: {
                type: "areaspline"
            },
            plotOptions: {
                series: {
                    stacking: ""
                },
                column: {
                    stacking: 'normal'
                },
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: false
            }
        },
        series: [],
        title: {
            text: ""
        },
        credits: {
            "enabled": false
        },
        legend: {
            enabled: false
        },
        loading: false,
        useHighStocks: false,
        exporting: true,
        xAxis: [{
                type: 'datetime',
                title: {text: 'Dias de la semana.'}
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Monto.'}
            }]
    };

    /**
     * funcion ventas por monto
     * @returns {undefined}
     */
    $scope.estadisticasVentasMonto = function () {
        $scope.estadistica = {
            'nombre': '',
            'apellido': '',
            'monto': 0
        };
        $scope.montoVendedor = [];
        $scope.chartConfigVentas.loading = true;
        $vendedores = facturaService.getVendedores();
        $vendedores.then(function (datos) {
            var colors = ['yellowgreen', 'purple', 'crimson', 'orange', 'yellow', 'red', 'green', 'pink', 'blue', 'cyan'];
            angular.forEach(datos.data, function (value, key) {
                $estadistica = chartService.getVentasVendedor(value.idUsuario);
                $estadistica.then(function (datos) {
                    $scope.sum = 0;
                    if (datos.status === 200) {
                        $scope.chartConfigVentas.series.push({
                            id: value.idUsuario,
                            data: [
                                [datos.data[0].date, datos.data[0].value],
                                [datos.data[1].date, datos.data[1].value],
                                [datos.data[2].date, datos.data[2].value],
                                [datos.data[3].date, datos.data[3].value],
                                [datos.data[4].date, datos.data[4].value],
                                [datos.data[5].date, datos.data[5].value],
                                [datos.data[6].date, datos.data[6].value]
                            ],
                            name: value.nombre,
                            type: "line",
                            dashStyle: "Solid",
                            color: colors[key]
                        });
                    }
                    angular.forEach(datos.data, function (value, key) {
                        $scope.sum = parseInt($scope.sum) + parseInt(value.value);
                    });
                    $scope.montoVendedor.push({
                        nombre: value.nombre,
                        apellido: value.apellido,
                        monto: $scope.sum
                    });
                    $scope.sum = 0;
                });
            });
            $scope.chartConfigVentas.loading = false;
        });
    };

    /*********************************************************************/

    /**
     * configuracion chart medio pago por monto
     */
    $scope.chartMedioPagoMonto = {
        options: {
            subtitle: {
                text: 'Monto de ventas por medio de pago.'
            },
            chart: {
                type: "areaspline"
            },
            plotOptions: {
                series: {
                    stacking: ""
                },
                column: {
                    stacking: 'normal'
                },
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: false
            }
        },
        series: [],
        title: {
            text: ""
        },
        credits: {
            "enabled": false
        },
        legend: {
            enabled: false
        },
        loading: false,
        useHighStocks: false,
        exporting: true,
        xAxis: [{
                type: 'datetime',
                title: {text: 'Dias de la semana.'}
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Monto.'}
            }]
    };

    $scope.ventasMedioPagoMonto = function () {
        $scope.montoMedioPago = [];
        $scope.chartMedioPagoMonto.loading = true;
        $medioPago = medioPagoService.getAll();
        $medioPago.then(function (datos) {
            var colors = ['yellowgreen', 'purple', 'crimson', 'orange', 'yellow', 'red', 'green', 'pink', 'blue', 'cyan'];
            angular.forEach(datos.data, function (value, key) {
                $estadistica = chartService.getMontoMedioPago(value.idMedioPago);
                $estadistica.then(function (datos) {
                    $scope.sum = 0;
                    if (datos.status === 200) {
                        $scope.chartMedioPagoMonto.series.push({
                            id: value.idUsuario,
                            data: [
                                [datos.data[0].date, datos.data[0].value],
                                [datos.data[1].date, datos.data[1].value],
                                [datos.data[2].date, datos.data[2].value],
                                [datos.data[3].date, datos.data[3].value],
                                [datos.data[4].date, datos.data[4].value],
                                [datos.data[5].date, datos.data[5].value],
                                [datos.data[6].date, datos.data[6].value]
                            ],
                            name: value.nombrePago,
                            type: "line",
                            dashStyle: "Solid",
                            color: colors[key]
                        });
                        angular.forEach(datos.data, function (value, key) {
                            $scope.sum = parseInt($scope.sum) + parseInt(value.value);
                        });
                        console.log(value);
                        $scope.montoMedioPago.push({
                            nombreMedio: value.nombrePago,
                            monto: $scope.sum
                        });
                        $scope.sum = 0;
                    }
                });
            });
            $scope.chartMedioPagoMonto.loading = false;
        });
    };

    /*********************************************************************/

    $scope.chartMedioPagoCantidad = {
        options: {
            subtitle: {
                text: 'Cantidad de ventas por medio de pago.'
            },
            chart: {
                type: "areaspline"
            },
            plotOptions: {
                series: {
                    stacking: ""
                },
                column: {
                    stacking: 'normal'
                },
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: false
            }
        },
        series: [],
        title: {
            text: ""
        },
        credits: {
            "enabled": false
        },
        legend: {
            enabled: false
        },
        loading: false,
        useHighStocks: false,
        exporting: true,
        xAxis: [{
                type: 'datetime',
                title: {text: 'Dias de la semana.'}
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Monto.'}
            }]
    };

    $scope.cantidadMedioPagoMonto = function () {
        $scope.cantidadMedioPago = [];
        $scope.chartMedioPagoCantidad.loading = true;
        $medioPago = medioPagoService.getAll();
        $medioPago.then(function (datos) {
            var colors = ['yellowgreen', 'purple', 'crimson', 'orange', 'yellow', 'red', 'green', 'pink', 'blue', 'cyan'];
            angular.forEach(datos.data, function (value, key) {
                $estadistica = chartService.getCantidadMedioPago(value.idMedioPago);
                $estadistica.then(function (datos) {
                    $scope.sum = 0;
                    if (datos.status === 200) {
                        $scope.chartMedioPagoCantidad.series.push({
                            id: value.idUsuario,
                            data: [
                                [datos.data[0].date, datos.data[0].value],
                                [datos.data[1].date, datos.data[1].value],
                                [datos.data[2].date, datos.data[2].value],
                                [datos.data[3].date, datos.data[3].value],
                                [datos.data[4].date, datos.data[4].value],
                                [datos.data[5].date, datos.data[5].value],
                                [datos.data[6].date, datos.data[6].value]
                            ],
                            name: value.nombrePago,
                            type: "line",
                            dashStyle: "Solid",
                            color: colors[key]
                        });
                        angular.forEach(datos.data, function (value, key) {
                            $scope.sum = parseInt($scope.sum) + parseInt(value.value);
                        });
                        console.log(value);
                        $scope.cantidadMedioPago.push({
                            nombreMedio: value.nombrePago,
                            monto: $scope.sum
                        });
                        $scope.sum = 0;
                    }
                });
            });
            $scope.chartMedioPagoCantidad.loading = false;
        });
    };

});

