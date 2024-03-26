const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver'); // Ensure you have ChromeDriver installed if using Chrome

async function testListenHistory() {
    let driver = await new Builder().forBrowser('chrome').build(); // Use 'firefox', 'chrome', etc.
    try {
        // Step 1: Navigate to the ListenHistory route
        await driver.get('http://localhost:5173/ListenHistory');

        // Step 2: Click the "Get Listen History" button
        await driver.findElement(By.xpath("//button[text()='Get Listen History']")).click();

        // Wait for the listen history to load. This example waits for a specific element that indicates
        // listen history is displayed. Adjust the selector as necessary.
        await driver.wait(until.elementLocated(By.css('div')), 10000); // Adjust selector to match your listen history container

        console.log('Listen history fetched and displayed.');

        // Optional: Validate listen history content if necessary

        // Step 3: Click the "Create Playlist" button (make sure it is visible and clickable)
        // Note: This step might need adjustment based on the actual visibility and availability of the button.
        await driver.findElement(By.xpath("//button[text()='Create Playlist']")).click();

        // Optional: Validate navigation to the Create Playlist page
        // For example, check the URL or page title
        const currentUrl = await driver.getCurrentUrl();
        if(currentUrl.includes("/CreatePlaylist")) {
            console.log('Navigation to Create Playlist page successful.');
        } else {
            console.log('Navigation to Create Playlist page failed.');
        }

    } catch(error) {
        console.error('Test failed. Error:', error);
    } finally {
        await driver.quit();
    }
}

testListenHistory();
