const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Contraseña *' });
        this.loginButton = page.getByRole('button', { name: 'Continuar' });
    }

    async navigate(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle'); // Esperar carga completa
    }

    async login(username, password) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };
