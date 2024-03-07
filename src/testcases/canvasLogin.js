const {launchBrowser} = require("../browser/selenium_driver");
const {canvasLoginXpaths, altTextAppXpaths } = require("../selectors/selectors.js");
const action = require("../actions/actions.js");

async function loginToCanvas(driver){
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

module.exports = { loginToCanvas }