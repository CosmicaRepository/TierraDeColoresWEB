/**
 * Controlador Categorias encargado de procesar datos referentes a las 
 * categorias registradas.
 * @param {type} param1
 * @param {type} param2
 */
miAppHome.controller('CategoriaController', function ($scope, $route, NgTableParams, categoriaService) {

    /**
     * Modelo de objecto categoria usado en las vistas para Agregar.
     */
    $scope._categoria = {
        "idCategoria": null,
        "nombreCategoria": "",
        "usuarioCreacion": null,
        "usuarioModificacion": null,
        "fechaCreacion": "",
        "fechaModificacion": null,
        "estado": true,
        "tipoCategoria": {
            "idTipo": null,
            "nombreTipo": "",
            "usuarioCreacion": null,
            "usuarioModificacion": null,
            "fechaCreacion": "",
            "fechaModificacion": null,
            "estado": true
        }
    };

    /**
     * Funcion lista de Categorias, encarga de enlistar todas las categorias 
     * disponibles en la base de datos.
     * @returns {undefined}
     */
    $scope.listaCategorias = function () {
        $scope.categorias = "";
        $promesa = categoriaService.getListaCategorias();
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $scope.categorias = datos.data;
            } else {
                alert("error");
            }
            var data = datos.data;
            $scope.tableCategorias = new NgTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function (params) {
                    data = $scope.categorias;
                    params.total(data.length);
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                }});
        });
    };

    /**
     * Funcion agregar nueva Categoria.
     * @param {type} categoria objecto recibido desde la vista.
     * @returns {undefined}
     */
    $scope.agrearCategoria = function (categoria) {
        $promesa = categoriaService.addCategoria(categoria);
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
        $promesa = categoriaService.deleteCategoria(categoria);
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
        $promesa = categoriaService.updateCategoria(categoria);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };

});

