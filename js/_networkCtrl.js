app.controller('NetworkCtrl',[
    '$scope', '$timeout',
    function($scope, $timeout){
        // =============================
        // Definición de Grafo con VisJs
        // =============================
        $scope.nodes = new vis.DataSet([]);
        $scope.edges = new vis.DataSet([]);
        $scope.options = {};
        $scope.container = document.getElementById('network');
        $scope.data = {
            nodes: $scope.nodes,
            edges: $scope.edges
        };
        network = new vis.Network($scope.container, $scope.data, $scope.options);

        // =======================================
        // Definición de Variables para Depuracion
        // =======================================
        dbg = {
            nodes: $scope.nodes,
            edges: $scope.edges,
            data: $scope.data,
            options: $scope.options,
            container: $scope.container
        };

        // Detección de Selección de Arco
        network.on('selectEdge', function(){
            $timeout(function(){
                var arco = $scope.$parent.arcoEdit = $scope.edges.get(network.getSelectedEdges()[0]);
                if (typeof arco.lugares === 'undefined') {
                    arco.lugares = {izq: [], der: []};
                    $scope.$parent.guiLugares.izq = [];
                    $scope.$parent.guiLugares.der = [];
                    console.log('Se creo la estructura de datos en el arco seleccionado.');
                }else{
                    $scope.$parent.guiLugares.izq = angular.copy(arco.lugares.izq);
                    $scope.$parent.guiLugares.der = angular.copy(arco.lugares.der);
                    console.log('Tiene lugares establecidos');
                }
            },0);
        });

    }
]);