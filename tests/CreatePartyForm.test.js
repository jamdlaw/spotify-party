const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function createPartyTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the page with the CreateParty form
    await driver.get('http://localhost:3000/path-to-your-createparty-component');

    // Wait for the input element to be loaded and then input a test party name
    let partyNameInput = await driver.wait(until.elementLocated(By.id('partyName')), 10000);
    await partyNameInput.sendKeys('Test Party', Key.RETURN);

    // Assuming the submission leads to navigation, wait for the navigation to complete
    // Adjust the URL to match the expected navigation target, e.g., the ListenHistory page
    await driver.wait(until.urlContains('ListenHistory'), 10000);

    // Perform any further checks here, such as verifying elements on the new page
    // Example: Check if a specific element that indicates success is present
    // let successIndicator = await driver.wait(until.elementLocated(By.id('success-indicator')), 10000);
    // assert(successIndicator.isDisplayed());

  } finally {
    await driver.quit();
  }
})();
