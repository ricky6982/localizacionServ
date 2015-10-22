// ========================
// Definición de Directivas
// ========================

// Directiva ts-panel-servicio
// Parametros: 
//      - listado-servicios
//      - lugar
//      - direccion
app.directive('tsPanelServicio', ['$filter', function ($filter) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: "panel-servicio.html",
        scope: {
            listadoServicios: '=listadoServicios',
            lugar: '=lugar',
            direccion: '@direccion',
            index: '=index'
        },
        controller: ['$scope',
            function($scope){
                $scope.updateSublistaServicios = function(){
                    var result = $filter('filter')($scope.listadoServicios, {id: $scope.lugar.idCategoria });
                    if (result.length > 0) {
                        $scope.sublistaServicios = result[0].items;
                    }
                };

                if ($scope.lugar) {
                    $scope.updateSublistaServicios();
                }
            }
        ]
    };
}]);