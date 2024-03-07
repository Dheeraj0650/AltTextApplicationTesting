const {Builder, By} = require("selenium-webdriver");

async function seleniumDriver(){
    let driver = await new Builder().forBrowser('chrome').build();
    return driver;
}

async function launchBrowser(driver, url){
    await driver.get(url);
}

module.exports = { seleniumDriver, launchBrowser };

