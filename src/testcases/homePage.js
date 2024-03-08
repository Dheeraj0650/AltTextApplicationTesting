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

describe("tests alt text home page", function(){
    it("checks Alt Text home page image and page content", async function(){
        let driver = await getWebDriver();
        await launchBrowserAndLoginToApp(driver);

        var image = await action.getElement(driver, altTextHomePageXpaths.alt_text_home_page_image);
        await action.scrollToElement(driver, image);
        assert.strictEqual(await action.doesElementExists(driver, image), true, `image div is missing on the home page`);

        var page_content= await action.getElement(driver, altTextHomePageXpaths.alt_text_page_content);
        await action.scrollToElement(driver, page_content);
        assert.strictEqual(await action.doesElementExists(driver, page_content), true, `page content div is missing on the home page`);
    });

    it("closing the browser", async function(){
        let driver = await getWebDriver();
        await driver.quit();
    });
});