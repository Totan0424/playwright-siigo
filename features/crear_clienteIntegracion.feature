Feature: Creación de Clientes - Integracion

  Scenario: Enviar datos al backend al crear un cliente
    Given el usuario ha completado el formulario de clientes con datos válidos
    When hace clic en el botón "Guardar"
    Then el sistema envía una solicitud POST a la API "/clientes"
    And la API responde con código "201 Created"
    And el cliente se almacena correctamente en la base de datos
