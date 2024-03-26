// ListenHistoryForm.test.js

const {Builder, By, until} = require('selenium-webdriver');
require('chromedriver'); // This assumes Chrome as the browser for testing

async function testListenHistoryForm() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the ListenHistory route
        await driver.get('http://localhost:5173/ListenHistory');

        // Click the "Get Listen History" button
        let getHistoryButton = await driver.findElement(By.xpath("//button[contains(text(),'Get Listen History')]"));
        await getHistoryButton.click();

        // Wait for the listen history results to be visible
        let listenHistoryResults = await driver.wait(until.elementLocated(By.className('listen-history-results')), 10000); // Adjust the class name based on your actual implementation
        console.log('Listen history results are displayed.');

        // Optional: Verify some results are displayed
        
        // Click the "Create Playlist" button if it's visible
        let createPlaylistButton = await driver.findElement(By.xpath("//button[contains(text(),'Create Playlist')]"));
        await createPlaylistButton.click();

        // Verify navigation to the Create Playlist page
        await driver.wait(until.urlContains('/CreatePlaylist'), 10000); // This waits up to 10 seconds for the URL to contain '/CreatePlaylist'
        console.log('Successfully navigated to Create Playlist page.');

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        await driver.quit(); // Make sure to quit the driver to close the browser
    }
}

testListenHistoryForm();

