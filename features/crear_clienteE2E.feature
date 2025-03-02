Feature: Creación de Clientes - E2E

  Scenario: Inicio de sesión exitoso
    Given que el usuario accede a la página de inicio de sesión
    When el usuario ingresa su correo "retoautomationsiigo@yopmail.com"
    And el usuario ingresa su contraseña "T4b4ck0ff1c3P455w0rd658*"
    And el usuario hace clic en el botón "Continuar"
    Then el usuario debería ser redirigido a la página de inicio de la plataforma

  Scenario: Creación de un nuevo cliente
    Given que el usuario ha iniciado sesión correctamente
    When el usuario hace clic en el botón "Crear"
    And el usuario llena el formulario con los datos del nuevo cliente
    And el usuario confirma la creación del cliente
    Then el usuario debería ver un mensaje de éxito indicando que el cliente fue creado correctamente

  Scenario: Navegación a la sección de clientes
    Given que el usuario ha iniciado sesión correctamente
    When el usuario hace clic en el enlace "Clientes"
    Then el usuario debería ser redirigido a la página de gestión de clientes
