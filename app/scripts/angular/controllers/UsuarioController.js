/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global miAppHome */

var usuarioController = miAppHome.controller('UsuarioController',
        ['$scope', '$state', '$window', 'toaster', '$route', '$timeout', '$cookies', 'Upload', '$location', 'UsuarioService', '$rootScope',
            function ($scope, $state, $window, toaster, $route, $timeout, $cookies, Upload, $location, UsuarioService, $rootScope) {

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

                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: null,
                    startingDay: 1
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.actualizarFoto = function (file) {
                    var token = $cookies.getObject('token');
                    if (typeof file !== 'undefined') {
                        var uri = 'https://tierradecoloresapi.herokuapp.com/usuarios/updatePhoto';
                        Upload.upload({
                            url: uri,
                            headers: {'Authorization': 'Bearer ' + token.data.access_token},
                            data: {file: file}
                        }).then(function (resp) {
                        }, function (resp) {
                        });
                    }
                    $timeout(function timer() {
                        $state.go($state.current, {}, {reload: true});
                        $timeout(function timer() {
                            $state.go('^.perfil-usuario');
                        }, 1000);
                    }, 2000);
                };
                $scope.actualizarPerfil = function () {
                    if ($scope.user.estado !== 'INACTVO') {
                        $scope.user.estado = true;
                    } else {
                        $scope.user.estado = false;
                    }
                    $promesa = UsuarioService.updateUsuario($scope.user);
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            toaster.pop({
                                type: 'success',
                                title: 'Exito',
                                body: 'Datos actualizados.',
                                showCloseButton: false
                            });
                            $state.go('^.perfil-usuario');
                        } else {
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: "¡Op's algo paso!, comunicate con el administrador.",
                                showCloseButton: false
                            });
                        }
                    });
                };

                $scope.listaUsuarios = function () {
                    $scope.usuarios = [];
                    $promesa = UsuarioService.getListaUsuarios();
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
                    $promesa = UsuarioService.getDetailUser();
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            if (datos.data.estado === true) {
                                datos.data.estado = 'Activo';
                            } else {
                                datos.data.estado = 'Inactivo';
                            }
                            if ($location.path() === '/perfil') {
                                $scope.user = datos.data;
                            } else {
                                $scope.user = datos.data;
                                var date = new Date(datos.data.fechaNacimiento);
                                var day = date.getDate();
                                date.setDate(day + 1);
                                $scope.user.fechaNacimiento = date;
                            }
                        }
                    }).catch(function (fallback) {
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'No se ha podido conectar con el servidor.',
                            showCloseButton: false
                        });
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
                    $promesa = UsuarioService.addUsuario($scope.newUser);
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            $state.transitionTo('home.usuario-lista');
                        } else {
                            alert(datos.data.msg);
                        }
                    });
                };


                $scope.cambiarPassword = function () {
                    $promesa = UsuarioService.changePassword($scope.userPw);
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            toaster.pop({
                                type: 'success',
                                title: 'Exito',
                                body: 'Contraseña actualizada.',
                                showCloseButton: false
                            });
                            $state.go('^.perfil-usuario');
                        } else {
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: datos.data.msg,
                                showCloseButton: false
                            });
                        }
                    });
                };

                $scope.seleccionarUsuario = function (usuario) {
                    $scope.modificarUsuario = usuario;
                };


                $scope.cambiarEstado = function (status) {
                    $scope.modificarUsuario.estado = status;
                    $promesa = UsuarioService.changeStatus(status, $scope.modificarUsuario);
                    $promesa.then(function (datos) {
                        if (datos.status === 200) {
                            $state.go($state.current, {}, {reload: true});
                        } else {
                            toaster.pop({
                                type: 'error',
                                title: 'Error',
                                body: "¡Op's algo paso!, comunicate con el administrador.",
                                showCloseButton: false
                            });
                        }
                    });
                };

            }]);
