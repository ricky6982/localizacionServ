var app = angular.module('app', []);

// ========================
// Definición de Directivas
// ========================
app.directive('tsPanelServicio', ['$filter', function ($filter) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: "panel-servicio.html",
        scope: {
            listadoServicios: '=listadoServicios',
            lugar: '=lugar'
        },
        controller: ['$scope',
            function($scope){
                $scope.updateSublistaServicios = function(){
                    $scope.sublistaServicios = $filter('filter')($scope.listadoServicios, {id: $scope.lugar.idCategoria })[0].listado;
                };

                // $scope.updateSublistaServicios();
            }
        ]
    };
}]);


// ===========================
// Definición de Controladores
// ===========================
app.controller('AppCtrl', [
    '$scope',
    function($scope){

        // =================================
        // ABM de Servicios y sus Categorias
        // =================================
        $scope.servicio = {
            selected: -1,
            nuevo: function(){
                servicio = {};
                servicio.nombre = $scope.servicioModal.nombre;
                servicio.id = generateId($scope.listadoServicios);
                servicio.items = [];
                $scope.listadoServicios.push(servicio);
                $scope.servicioModal.nombre = "";
            },
            borrar: function(index){
                if (confirm('¿Esta seguro de que desea eliminar el servicio y todos sus items?')) {
                    $scope.listadoServicios.splice(index, 1);
                }
            },
            editar: function(index){
                $scope.servicio.selected = index;
            },
            endEdit: function(){
                $scope.servicio.selected = -1;
            }
        };

        $scope.servicioSelected = 0;

        $scope.item = {
            nuevo: function(idServ){
                $scope.servicioSelected = idServ;
            },
            guardar: function(){
                var servicio = _.find($scope.listadoServicios, {id: $scope.servicioSelected});
                var item = angular.copy($scope.itemModal);
                item.id = generateId(servicio.items);
                servicio.items.push(item);
                $scope.itemModal.nombre = "";
                $scope.itemModal.descripcion = "";
            },

            editable: {
                servicio: -1,
                item: -1
            },

            editar: function(idServ, indexItem){
                $scope.item.editable.servicio = idServ;
                $scope.item.editable.item = indexItem;
            },

            editForm: function(servicio, item){
                if ($scope.item.editable.servicio == servicio && $scope.item.editable.item == item) {
                    return true;
                }else{
                    return false;
                }
            },

            endEdit: function(){
                $scope.item.editable.servicio = -1;
                $scope.item.editable.item = -1;
            },

            borrar: function(idServ, indexItem){
                if (confirm('¿Esta seguro que desea eliminar el Item?')) {
                    var servicio = _.find($scope.listadoServicios, {id: idServ});
                    servicio.items.splice(indexItem, 1);
                }
            }
        };

        function generateId(list){
            var max = _.max(list, function(list){ return list.id; });
            if ( max === -Infinity ) {
                return 1;
            }else{
                return max.id + 1;
            }
        }

        // ==============================================
        // Estructura de Datos de los servicios ordenados 
        // por sus categorias
        // ==============================================
        $scope.listadoServicios = [
            {
                id: 1,
                nombre: 'Boleterias',
                items: [
                    {
                        id: 10,
                        nombre: 'El Quiaqueño',
                        descripcion: 'Viajes al interior de la Provincia.'
                    },
                    {
                        id: 11,
                        nombre: 'Balut',
                        descripcion: 'Viajes a todo el Pais.'
                    }
                ]
            }
        ];

        // ==============================================
        // Logica para la interfaz visual para posicionar
        // un servicio sobre un arco
        // ==============================================
        $scope.itemAux = {
            idCategoria: null,
            idServicio: null,
            categoria: "",
            servicio: "",
            distancia: ""
        };

        $scope.serviciosItem = function(){
            return [{id: 1, nombre: "test 1"},{id: 2, nombre: "test 2"},{id: 3, nombre: "test 3"}];
        };

        $scope.guiLocalizar = {
            izq: [{idCategoria: null, idServicio: null, categoria: "", servicio:""}],
            der: [],
            add: function(direccion){
                console.log('Agregregando item a la ' + direccion);
            },
            remove: function(item){
                console.log('Removiendo item ' + item);
            }
        };


    }
]);