const { expect } = require('@playwright/test');

class ClientesPage {
    constructor(page) {
        this.page = page;
        this.createButton = page.getByRole('button', { name: 'Crear' });
        this.clientesLink = page.getByRole('link', { name: 'Clientes', exact: true });
        this.tipoIdentificacionDropdown = page.locator('siigo-dropdownlist-web').filter({ hasText: '* Tipo de identificació' }).locator('div').nth(2);
        this.cedulaOption = page.getByText('Cédula de ciudadanía');
        this.nombresInput = page.locator('siigo-textfield-web').filter({ hasText: '* Nombres' }).getByRole('textbox');
        this.apellidosInput = page.locator('siigo-textfield-web').filter({ hasText: '* Apellidos' }).getByRole('textbox');
        this.identificacionInput = page.locator('#identification').getByRole('textbox');
        this.guardarButton = page.locator('#sticky').getByRole('button', { name: 'Guardar' });
    }

    async goToClientesPage() {
        await this.createButton.click();
        await this.clientesLink.click();
        await this.page.waitForSelector('form', { state: 'visible', timeout: 10000 });
    }

    async fillClienteForm(nombres, apellidos, identificacion) {
        await this.tipoIdentificacionDropdown.click();
        await this.cedulaOption.click();
        await this.nombresInput.fill(nombres);
        await this.apellidosInput.fill(apellidos);
        await this.identificacionInput.fill(identificacion);
    }

    async validateGuardarButton() {
        await expect(this.guardarButton).toBeVisible();
        console.log('✅ El botón "Guardar" es visible en la pantalla.');
    }

    async submitForm() {
        await this.guardarButton.click();
    }
}

module.exports = { ClientesPage };
