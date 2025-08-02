const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();

  const username = process.env.LOGIN_USER || 'user';
  const password = process.env.LOGIN_PASS || 'pass';
  const loginUrl = 'https://example.com/login';

  try {
    await driver.get(loginUrl);

    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await driver.findElement(By.id('username')).sendKeys(username);

    await driver.wait(until.elementLocated(By.id('password')), 5000);
    await driver.findElement(By.id('password')).sendKeys(password);

    await driver.wait(until.elementLocated(By.id('login-button')), 5000);
    await driver.findElement(By.id('login-button')).click();

    const welcomeEl = await driver.wait(until.elementLocated(By.id('welcome')), 5000);
    const welcomeMessage = await welcomeEl.getText();

    if (welcomeMessage !== 'Welcome User') {
      throw new Error(`Unexpected welcome message: "${welcomeMessage}"`);
    }

    console.log('✅ Login successful');
  } catch (err) {
    console.error('Test failed:', err);
    // TODO: add screenshot for debugging
    await driver.takeScreenshot().then(
      image => require('fs').writeFileSync('error_screenshot.png', image, 'base64')
    );
  } finally {
    await driver.quit();
  }
}

testLogin();
