const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ClientesPage } = require('../pages/ClientesPage');

const url = 'https://qastaging.siigo.com/#/login';
const username = 'retoautomationsiigo@yopmail.com';
const password = 'T4b4ck0ff1c3P455w0rd658*';

//Test con Tablas de Decisión para la creación de clientes
test('Validación del formulario - Tablas de Decisión', async ({ page }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);

    await loginPage.navigate(url);
    await loginPage.login(username, password);

    await clientesPage.goToClientesPage();

    //Caso 1: Todos los datos válidos
    await clientesPage.fillClienteForm('Juan', 'Pérez', '12345678');
    await clientesPage.submitForm();
    await expect(page.getByText('Cliente creado exitosamente')).toBeVisible();
    console.log('Cliente creado correctamente.');

    //Caso 2: Nombre vacío
    await clientesPage.fillClienteForm('', 'Pérez', '12345678');
    await clientesPage.submitForm();
    await expect(page.getByText('Nombre obligatorio')).toBeVisible();
    console.log('Error esperado: Nombre obligatorio.');

    //Caso 3: Apellidos vacíos
    await clientesPage.fillClienteForm('Juan', '', '12345678');
    await clientesPage.submitForm();
    await expect(page.getByText('Apellidos obligatorios')).toBeVisible();
    console.log('Error esperado: Apellidos obligatorios.');

    //Caso 4: Identificación vacía
    await clientesPage.fillClienteForm('Juan', 'Pérez', '');
    await clientesPage.submitForm();
    await expect(page.getByText('Identificación obligatoria')).toBeVisible();
    console.log('Error esperado: Identificación obligatoria.');

    //Caso 5: Todos los campos vacíos
    await clientesPage.fillClienteForm('', '', '');
    await clientesPage.submitForm();
    await expect(page.getByText('Todos los campos obligatorios')).toBeVisible();
    console.log('Error esperado: Todos los campos obligatorios.');
});
