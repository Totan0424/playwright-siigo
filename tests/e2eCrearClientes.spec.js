const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ClientesPage } = require('../pages/ClientesPage');


const url = 'https://qastaging.siigo.com/#/login';
const username = 'retoautomationsiigo@yopmail.com';
const password = 'T4b4ck0ff1c3P455w0rd658*';

//Escenario de prueba E2E para creación de clientes
test('E2E - Crear Cliente', async ({ page }) => {
    test.setTimeout(60000);

    //Instancia de las paginas
    const loginPage = new LoginPage(page);
    const clientesPage = new ClientesPage(page);

    //Login
    await loginPage.navigate(url);
    await loginPage.login(username, password);

    //llenar formulario
    await clientesPage.goToClientesPage();
    await clientesPage.fillClienteForm('Nametest', 'Lastnametest', '7445836255');

    //Botón "Guardar" visible
    await clientesPage.validateGuardarButton();

    // Envio de formulario
    await clientesPage.submitForm();
});
