const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ClientesPage } = require('../pages/ClientesPage');

const url = 'https://qastaging.siigo.com/#/login';
const username = 'retoautomationsiigo@yopmail.com';
const password = 'T4b4ck0ff1c3P455w0rd658*';

//Test de Partición de Equivalencias para el campo "Nombre"
test('Validación del campo Nombre - Partición de Equivalencias', async ({ page }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);

    await loginPage.navigate(url);
    await loginPage.login(username, password);

    await clientesPage.goToClientesPage();

    const nombreField = clientesPage.nombresInput;

    await nombreField.fill('Juan Pérez');
    await expect(nombreField).toHaveValue('Juan Pérez');
    console.log('✅ Caso válido: "Juan Pérez"');

    await nombreField.fill('123456');
    await clientesPage.submitForm();
    await expect(page.getByText('Nombre inválido')).toBeVisible();
    console.log('❌ Error esperado: "123456" no es un nombre válido.');

    await nombreField.fill('');
    await clientesPage.submitForm();
    await expect(page.getByText('Campo obligatorio')).toBeVisible();
    console.log('❌ Error esperado: Nombre no puede estar vacío.');

    await nombreField.fill('@Cliente!');
    await clientesPage.submitForm();
    await expect(page.getByText('Nombre inválido')).toBeVisible();
    console.log('❌ Error esperado: "@Cliente!" contiene caracteres inválidos.');
});
