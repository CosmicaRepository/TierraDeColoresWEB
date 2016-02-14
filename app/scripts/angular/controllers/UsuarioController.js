/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miApp.controller('UsuarioController', function ($scope, $route, $timeout, $cookies, Upload, $location, _usuarioService, factoryCache, $rootScope) {

    $scope.user = {
        "apellido": "",
        "dni": "",
        "domicilio": "",
        "email": "",
        "estado": "",
        "fechaCreacion": "",
        "fechaModificacion": "",
        "fechaNacimiento": "",
        "idUsuario": "",
        "idUsuarioCreacion": "",
        "idUsuarioModificacion": "",
        "imagen": "",
        "nombre": "",
        "passwordUsuario": "",
        "provincia": "",
        "roles": "",
        "telefono": "",
        "username": ""
    };

    $scope.userPw = {
        "old": "",
        "new": "",
        "rep": ""
    };

    $scope.actualizarFoto = function (file) {
        var token = $cookies.getObject('token');
        if (typeof file !== 'undefined') {
            Upload.upload({
                url: 'http://localhost:8080/usuarios/updatePhoto',
                headers: {'Authorization': 'Bearer ' + token.data.access_token},
                data: {file: file}
            }).then(function (resp) {
                console.log("success");
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            });
        }
        $timeout(function timer() {
            $location.path("/perfil");
        }, 1000);
    };
    $scope.actualizarPerfil = function () {
        if ($scope.user.estado !== 'INACTVO') {
            $scope.user.estado = true;
        } else {
            $scope.user.estado = false;
        }
        $promesa = _usuarioService.updateUsuario($scope.user);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $location.path("/");
            }
        });
    };

    $scope.listaUsuarios = function () {
        $scope.usuarios = [];
        $promesa = _usuarioService.getListaUsuarios();
        $promesa.then(function (datos) {
            if (datos.status !== 200) {
                $scope.usuarios = null;
            } else {
                angular.forEach(datos.data, function (value, key) {
                    if (value.estado) {
                        $scope.usuarios.push(value);
                    } else {
                        $scope.usuarios.push(value);
                    }
                });
            }
        });
    };
    $scope.detailUsuario = function () {
        $promesa = _usuarioService.getDetallesUsuario();
        $promesa.then(function (datos) {
            if (datos.data.estado === true) {
                datos.data.estado = 'Activo';
            } else {
                datos.data.estado = 'Inactivo';
            }
            if ($location.path() === '/perfil') {
                $scope.user = datos.data;
            } else {
                var arrayFecha = datos.data.fechaNacimiento.split("-");
                var fecha = new Date();
                fecha.setDate(arrayFecha[2]);
                fecha.setMonth(arrayFecha[1] - 1);
                fecha.setFullYear(arrayFecha[0]);
                $scope.user = datos.data;
                $scope.user.fechaNacimiento = fecha;
            }
        });
    };


    $scope.nuevoUsuario = function (usuario) {
        var fecha = usuario.fechaNacimiento.getFullYear() + "-" +
                (usuario.fechaNacimiento.getMonth() + 1) + "-" +
                usuario.fechaNacimiento.getDate();
        $scope.newUser = {
            "apellido": usuario.apellido,
            "dni": usuario.dni,
            "domicilio": usuario.domicilio,
            "email": usuario.email,
            "estado": false,
            "fechaCreacion": "",
            "fechaModificacion": "",
            "fechaNacimiento": fecha,
            "idUsuario": "",
            "idUsuarioCreacion": "",
            "idUsuarioModificacion": "",
            "imagen": null,
            "nombre": usuario.nombre,
            "passwordUsuario": usuario.passwordUsuario,
            "provincia": "San Salvador de Jujuy",
            "roles": {
                "idRol": 2,
                "nombreRol": "VENDEDOR",
                "fechaCreacion": "2016-01-31",
                "fechaModificacion": null,
                "usuarioCreacion": 1,
                "usuarioModificacion": null
            },
            "telefono": usuario.telefono,
            "username": usuario.username
        };
        $promesa = _usuarioService.addUsuario($scope.newUser);
        $promesa.then(function (datos) {
            console.log(datos);
            if (datos.status === 200) {
                $location.path("/usuarios");
            } else {
                alert(datos.data.msg);
            }
        });
    };


    $scope.cambiarPassword = function () {
        $promesa = _usuarioService.changePassword($scope.userPw);
        $promesa.then(function (datos) {
            console.log(datos);
            if (datos.status === 200) {
                $location.path("/perfil");
            } else {
                alert("error");
            }
        });
    };

    $scope.cambiarEstado = function (status, user) {
        user.estado = status;
        $promesa = _usuarioService.changeStatus(status, user);
        $promesa.then(function (datos) {
            if (datos.status === 200) {
                $route.reload();
            } else {
                alert("error");
            }
        });
    };
});

