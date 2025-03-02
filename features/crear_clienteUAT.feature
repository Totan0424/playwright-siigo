Feature: Creación de Cliente - UAT

  Scenario: Un usuario crea un cliente exitosamente
    Given soy un usuario autenticado en la aplicación
    When navego a la opción "Clientes" y hago clic en "Crear"
    And completo el formulario con datos válidos
    And hago clic en "Guardar"
    Then el sistema confirma la creación del cliente con un mensaje
    And puedo ver el cliente recién creado en la lista de clientes
