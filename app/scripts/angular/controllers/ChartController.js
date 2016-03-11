/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.controller('ChartController', function ($scope) {

    $scope.chartConfig = {
        options: {
            chart: {
                type: "areaspline",
                zoomType: 'x'
            },
            plotOptions: {
                series: {
                    stacking: ""
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
        useHighStocks: false,
        xAxis: [{
                type: 'datetime'
            }],
        yAxis: [{
                currentMin: 0,
                currentMax: 20,
                minRange: 1,
                title: {text: 'Cantidad'}
            }]
    };
    var date = new Date('04-04-1992');
    var date1 = new Date('04-05-1992').getTime();
    var date2 = new Date('04-06-1992').getTime();
    var date3 = new Date('04-07-1992').getTime();
    var date4 = new Date('04-08-1992').getTime();
    $scope.chartConfig.series.push({
        id: 1,
        data: [
            [date.getTime(), 23.15],
            [date1, 23.01],
            [date2, 22.73],
            [date3, 22.83],
            [date4, 19.83]
        ],
        name: "Vendedor 1",
        type: "spline",
        dashStyle: "Solid",
        color: "blue"
    });


});

