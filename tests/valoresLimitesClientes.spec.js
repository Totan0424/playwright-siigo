const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ClientesPage } = require('../pages/ClientesPage');

const url = 'https://qastaging.siigo.com/#/login';
const username = 'retoautomationsiigo@yopmail.com';
const password = 'T4b4ck0ff1c3P455w0rd658*';

//Test de Valores Límite para el campo "Nombre"
test('Validación del campo Nombre - Valores Límite', async ({ page }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);

    await loginPage.navigate(url);
    await loginPage.login(username, password);

    await clientesPage.goToClientesPage();

    const nombreField = clientesPage.nombresInput;

    //Caso válido: Mínimo permitido (1 caracter)
    await nombreField.fill('A');
    await expect(nombreField).toHaveValue('A');
    console.log('Caso válido: Nombre con 1 caracter.');

    //Caso inválido: Vacío
    await nombreField.fill('');
    await clientesPage.submitForm();
    await expect(page.getByText('Campo obligatorio')).toBeVisible();
    console.log('Error esperado: Nombre no puede estar vacío.');

    //Caso válido: Máximo permitido (255 caracteres)
    const maxNombre = 'A'.repeat(255);
    await nombreField.fill(maxNombre);
    await expect(nombreField).toHaveValue(maxNombre);
    console.log('Caso válido: Nombre con 255 caracteres.');

    //Caso inválido: Excede el límite (256 caracteres)
    const overMaxNombre = 'A'.repeat(256);
    await nombreField.fill(overMaxNombre);
    await clientesPage.submitForm();
    await expect(page.getByText('Nombre demasiado largo')).toBeVisible();
    console.log('Error esperado: Nombre con 256 caracteres excede el límite.');
});
