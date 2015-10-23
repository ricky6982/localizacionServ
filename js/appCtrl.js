// ===========================
// Definición de Controladores
// ===========================

// CONTROLADOR PRINCIPAL
app.controller('AppCtrl', [
    '$scope',
    function($scope){

        // Datos que estarán compartidos entre los dos controladores
        // ServicioCtrl y LocalizacionCtrl.

        $scope.listadoServicios = [];

        $scope.guiLugares = {};

        // Ejemplo con Datos Cargados
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

    }
]);
