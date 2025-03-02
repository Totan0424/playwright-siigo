const { Given, When, Then } = require("@cucumber/cucumber");
const { firefox } = require("playwright");
const { expect } = require("@playwright/test");

// Configurar Playwright
const { firefox } = require("playwright");

let browser, page;

Given("que el usuario accede a la página de inicio de sesión", async function () {
  browser = await firefox.launch({ headless: false, slowMo: 500 }); 
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://qastaging.siigo.com/#/login");
});

When("el usuario ingresa su correo {string}", async function (email) {
  await page.getByRole("textbox", { name: "Correo electrónico *" }).fill(email);
});

When("el usuario ingresa su contraseña {string}", async function (password) {
  await page.getByRole("textbox", { name: "Contraseña *" }).fill(password);
});

When("el usuario hace clic en el botón {string}", async function (buttonText) {
  await page.getByRole("button", { name: buttonText }).click();
});

Then("el usuario debería ser redirigido a la página de inicio de la plataforma", async function () {
  await page.waitForURL("https://qastaging.siigo.com/#/home");
  expect(page.url()).toContain("/home");
});


