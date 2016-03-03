/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.factory('factoryConnection', function ($resource) {
    return $resource('scripts/connection.json', {}, {
        getData: {method: 'GET', isArray: false}
    });
});

