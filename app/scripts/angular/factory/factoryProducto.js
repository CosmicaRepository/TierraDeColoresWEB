/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.factory('factoryProducto', function (_productoService) {
    var productosArray = [];
    _productoService.getAll().then(function (datos) {
        angular.forEach(datos.data, function (value, key) {
            productosArray.push(value);
        });
        console.log(productosArray);
    });
    'use strict';
    return productosArray;
});

