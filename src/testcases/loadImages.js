require('dotenv').config()
const {launchBrowser} = require("../browser/selenium_driver.js");
const {canvasLoginXpaths, altTextAppXpaths, altTextHomePageXpaths, altTextLoadPageXpaths, altTextAppNames} = require("../selectors/selectors.js");
const action = require("../actions/actions.js");
const assert = require('assert');
const {seleniumDriver} = require("../browser/selenium_driver.js");
const database = require('../services/sql-service');

var webdriver = null;

async function getWebDriver(){
    if(webdriver){
        return webdriver;
    }
    else{
        await database.connectToDatabase();
        webdriver = await seleniumDriver();;
        return webdriver;
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

describe("tests ability to Load Images", function(){
    it("checking ability to load images through UI", async function(){
        let driver = await getWebDriver();
        
        await database.deleteData(process.env.DB_TABLE, 'course_id', process.env.COURSE_ID)
        await launchBrowserAndLoginToApp(driver);
        await action.click(driver, altTextAppXpaths.alt_text_buttons_specific.replace("?", "Load Images"));

        await action.sendKeys(driver, process.env.COURSE_ID, altTextLoadPageXpaths.course_id_input);
        await action.click(driver, altTextLoadPageXpaths.alt_text_button_specific.replace("?", "Load Images from Canvas Course"));

        let element = await action.getElement(driver, altTextLoadPageXpaths.alert_banner.replace("?", "image was successfully added to the queue from the canvas course"), 30000);
        assert.strictEqual(await action.doesElementExists(driver, element), true, "failed to lod images on to application - part 1");

        await action.sendKeys(driver, process.env.COURSE_ID, altTextLoadPageXpaths.course_id_input);
        await action.click(driver, altTextLoadPageXpaths.alt_text_button_specific.replace("?", "Load Images from Canvas Course"));

        element = await action.getElement(driver, altTextLoadPageXpaths.alert_banner.replace("?", "No images were added to the queue from the canvas course"), 30000);
        assert.strictEqual(await action.doesElementExists(driver, element), true, "failed to lod images on to application - part 2");
    });

    it("checking whether images loaded on to the home page", async function(){
        let driver = await getWebDriver();
        await launchBrowserAndLoginToApp(driver);
        await action.click(driver, altTextAppXpaths.alt_text_buttons_specific.replace("?", "Home"));

        await action.click(driver, altTextHomePageXpaths.courses_drop_down);
        await driver.sleep(2000);
        await action.click(driver, altTextHomePageXpaths.course_drop_down_list.replace("?", "Temp - Alt Text Test 1"));
        await driver.sleep(2000);
        let imageElement = await action.getElement(driver, altTextHomePageXpaths.course_image_name, 30000);
        let imageText = await action.getTextFromElement(imageElement);

        assert.strictEqual(altTextAppNames.course_image_names.includes(imageText), true, "image is not loaded on to the application properly");
    });

    it("closing the browser", async function(){
        let driver = await getWebDriver();
        await driver.quit();
    });
});