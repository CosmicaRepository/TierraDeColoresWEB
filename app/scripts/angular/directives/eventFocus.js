/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
miAppHome.directive('eventFocus', function (focus) {
    return function (scope, elem, attr) {
        elem.on(attr.eventFocus, function () {
            focus(attr.eventFocusId);
        });

        // Removes bound events in the element itself
        // when the scope is destroyed
        scope.$on('$destroy', function () {
            element.off(attr.eventFocus);
        });
    };
});

