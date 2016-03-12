/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('ChartController', function ($scope, chartService, facturaService) {

    $scope.myInterval = 5000;
    $scope.noWrapSlides = true;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.chartConfig = {
        options: {
            subtitle: {
                text: 'Cantidad de ventas por vendedor'
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
            text: "Estadisticas de ventas"
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
                title: {text: 'Dias de la semana'}
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Cantidad'}
            }]
    };
    $scope.estadisticasVentas = function () {
        $scope.chartConfig.loading = true;
        $vendedores = facturaService.getVendedores();
        $vendedores.then(function (datos) {
            var colors = ['yellowgreen', 'purple', 'crimson', 'orange', 'yellow', 'red', 'green', 'pink', 'blue', 'cyan'];
            angular.forEach(datos.data, function (value, key) {
                console.log(value);
                $estadistica = chartService.getEstadisticaVendedor(value.idUsuario);
                $estadistica.then(function (datos) {
                    if (datos.status === 200) {
                        $scope.chartConfig.series.push({
                            id: value.idUsuario,
                            data: [
                                [datos.data[0].date, datos.data[0].rowCount],
                                [datos.data[1].date, datos.data[1].rowCount],
                                [datos.data[2].date, datos.data[2].rowCount],
                                [datos.data[3].date, datos.data[3].rowCount],
                                [datos.data[4].date, datos.data[4].rowCount],
                                [datos.data[5].date, datos.data[5].rowCount],
                                [datos.data[6].date, datos.data[6].rowCount]
                            ],
                            name: value.nombre,
                            type: "spline",
                            dashStyle: "Solid",
                            color: colors[key]
                        });
                    }
                });
            });
            $scope.chartConfig.loading = false;
        });
    };
});

