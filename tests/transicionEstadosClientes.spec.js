const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ClientesPage } = require('../pages/ClientesPage');

const url = 'https://qastaging.siigo.com/#/login';
const username = 'retoautomationsiigo@yopmail.com';
const password = 'T4b4ck0ff1c3P455w0rd658*';

//Test de Transición de Estados para el formulario de clientes
test('Validación de Transición de Estados en el Formulario', async ({ page }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);

    await loginPage.navigate(url);
    await loginPage.login(username, password);

    await clientesPage.goToClientesPage();

    console.log('Estado Inicial: Formulario sin datos.');
    await expect(clientesPage.guardarButton).toBeDisabled();

    //Estado 1:** Se ingresa "Nombre"
    await clientesPage.nombresInput.fill('Juan');
    console.log('Estado 1: Se ingresó Nombre.');
    await expect(clientesPage.apellidosInput).toBeEnabled();

    //Estado 2:** Se ingresa "Apellidos"
    await clientesPage.apellidosInput.fill('Pérez');
    console.log('Estado 2: Se ingresó Apellidos.');
    await expect(clientesPage.identificacionInput).toBeEnabled();

    //Estado 3:** Se ingresa "Identificación"
    await clientesPage.identificacionInput.fill('12345678');
    console.log('Estado 3: Se ingresó Identificación.');
    await expect(clientesPage.guardarButton).toBeEnabled();

    //Estado 4:** Intento de guardar con campos vacíos
    await clientesPage.nombresInput.fill('');
    await clientesPage.submitForm();
    await expect(page.getByText('Nombre obligatorio')).toBeVisible();
    console.log('Estado 4: Intento fallido, Nombre es obligatorio.');

    //Estado Final:** Se llenan todos los datos correctamente
    await clientesPage.nombresInput.fill('Juan');
    await clientesPage.submitForm();
    await expect(page.getByText('Cliente creado exitosamente')).toBeVisible();
    console.log('Estado Final: Cliente creado con éxito.');
});
