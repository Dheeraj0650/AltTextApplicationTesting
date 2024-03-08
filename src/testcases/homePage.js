require('dotenv').config()
const {launchBrowser} = require("../browser/selenium_driver.js");
const {canvasLoginXpaths, altTextAppXpaths, altTextHomePageXpaths} = require("../selectors/selectors.js");
const action = require("../actions/actions.js");
const assert = require('assert');
const {seleniumDriver} = require("../browser/selenium_driver.js");

var webdriver = null;

async function getWebDriver(){
    if(webdriver){
        return webdriver;
    }
    else{
        return await seleniumDriver();
    }
}

async function launchBrowserAndLoginToApp(driver){
    await launchBrowser(driver, process.env.CANVAS_URL);
    await action.sendKeys(driver, process.env.CANVAS_USERNAME, canvasLoginXpaths.canvas_username);
    await action.sendKeys(driver, process.env.CANVAS_PASSWORD, canvasLoginXpaths.canvas_password);
    await action.click(driver, canvasLoginXpaths.canvas_login);

    await action.wait(driver, canvasLoginXpaths.canvas_page_title);
    await launchBrowser(driver, process.env.ALT_TEXT_URL);

    await action.click(driver, altTextAppXpaths.alt_text_launch_button);

    await driver.navigate().refresh();
    await action.switchToIframe(driver, altTextAppXpaths.alt_text_iframe)

    await action.wait(driver, altTextAppXpaths.alt_text_home_page);
}

describe("tests login to canvas and alt text home page", function(){
    it("checks Alt Text home page image and page content", async function(){
        let driver = await getWebDriver();
        await launchBrowserAndLoginToApp(driver);
        var footer = await action.getElement(driver, altTextHomePageXpaths.context_nav);
        await action.scrollToElement(driver, footer);
    });
});