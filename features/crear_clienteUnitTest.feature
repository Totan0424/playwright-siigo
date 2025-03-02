Feature: Validación del Campo Nombre

  Scenario Outline: Validar entradas en el campo "Nombre"
    Given el usuario está en el formulario de clientes
    When ingresa "<nombre>" en el campo "Nombre"
    Then el sistema muestra "<mensaje esperado>"

    Examples:
      | Nombre       | Mensaje esperado               |
      | Test Test   | (Campo válido, sin errores)   |
      | 123456      | "Nombre inválido"             |
      | @Cliente!   | "Nombre inválido"             |
      | (vacío)     | "Campo obligatorio"           |
