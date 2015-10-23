app.controller('NetworkCtrl',[
    '$scope',
    function($scope){
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

    }
]);