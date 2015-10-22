
// CONTROLADOR PARA ABM de Servicios
app.controller('ServicioCtrl', [
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
    }
]);