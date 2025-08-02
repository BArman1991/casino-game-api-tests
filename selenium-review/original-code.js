const { Builder, By } = require('selenium-webdriver');


async function testLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
    await driver.get('https://example.com/login');
    await driver.findElement(By.id('username')).sendKeys('user');
    await driver.findElement(By.id('password')).sendKeys('pass');
    await driver.findElement(By.id('login-button')).click();
    let welcomeMessage = await
    driver.findElement(By.id('welcome')).getText();
    if (welcomeMessage !== 'Welcome User') {
    throw new Error('Login failed');
    }
    console.log('Login successful!');
    } catch (error) {
    console.error('Test failed:', error);
    } finally {
    await driver.quit();
    }
    }
    testLogin();