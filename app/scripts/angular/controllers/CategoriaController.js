/**
 * Controlador Categorias encargado de procesar datos referentes a las 
 * categorias registradas.
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('CategoriaController', function ($scope, ngTableParams, createDialog, $route, $timeout, $cookies, Upload, $location, _categoriaService, factoryCache, $rootScope) {

    /**
     * Modelo de objecto categoria usado en las vistas para Agregar.
     */
    $scope._categoria = {
        "idCategoria": null,
        "nombreCategoria": "",
        "usuarioCreacion": null,
        "usuarioModificacion": null,
        "fechaCreacion": "",
        "fechaModificacion": null
    };

    /**
     * Funcion lista de Categorias, encarga de enlistar todas las categorias 
     * disponibles en la base de datos.
     * @returns {undefined}
     */
    $scope.listaCategorias = function () {
        $scope.categorias = "";
        $promesa = _categoriaService.getListaCategorias();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $scope.categorias = datos.data;
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion agregar nueva Categoria.
     * @param {type} categoria objecto recibido desde la vista.
     * @returns {undefined}
     */
    $scope.agrearCategoria = function (categoria) {
        $promesa = _categoriaService.addCategoria(categoria);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion eliminar Categoria
     * @param {type} categoria objecto recibido desde la vista.
     * @returns {undefined}
     */
    $scope.eliminarCategoria = function (categoria) {
        $promesa = _categoriaService.deleteCategoria(categoria);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

    /**
     * Funcion seleccionar, encarga de seleccionar un objecto en particular en
     * una tabla
     * @param {type} categoria objecto recibido desde una tabla en la vista.
     * @returns {undefined}
     */
    $scope.seleccionarCategoria = function (categoria) {
        $scope.__categoria = categoria;
    };

    /**
     * Funcion modificar Categoria, encargada de modificar la Categoria 
     * seleccionada a travéz de un model en la vista.
     * @param {type} categoria objecto recibido desde un model en la vista.
     * @returns {undefined}
     */
    $scope._modificarCategoria = function (categoria) {
        $promesa = _categoriaService.updateCategoria(categoria);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

});

