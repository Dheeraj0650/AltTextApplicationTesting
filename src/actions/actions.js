const {By, until} = require("selenium-webdriver");
const {altTextAppXpaths} = require("../selectors/selectors.js");


async function doesElementExists(driver, element){
    try{
        await driver.wait(until.elementIsVisible(element), 5000);
        return true;
    }
    catch(error){
        console.log("error in doesElementExists ", error.message);
        return false;
    } 
}

async function sendKeys(driver, keys, selector){
    try{
        await driver.wait(until.elementLocated(By.xpath(selector)), 5000)
        const element = await driver.findElement(By.xpath(selector));
        await driver.wait(until.elementIsVisible(element), 5000);
        await element.sendKeys(keys);
    }
    catch(error){
        console.log("error in sendKeys ", error.message)
    }
}

async function click(driver, selector){
    try{
        await driver.wait(until.elementLocated(By.xpath(selector)), 5000)
        const element = await driver.findElement(By.xpath(selector));
        await driver.wait(until.elementIsVisible(element), 5000);
        await element.click();
    }
    catch(error){
        console.log("error in click ", error.message)
    }
}

async function wait(driver, selector, timeout){
    for(var idx = 0; idx < 2 ; idx ++){
        try{
            await driver.wait(until.elementLocated(By.xpath(selector)), timeout);
            break;
        }
        catch(error){
            await driver.navigate().refresh();
            console.log("error in wait ", error.message);
        }
    }
}

async function switchToIframe(driver, selector){
    try{
        // Switch to the frame
        await wait(driver, selector);
        const iframe = await driver.findElement(By.xpath(selector));
        await driver.switchTo().frame(iframe);
    }
    catch(error){
        console.log("error in switchToIframe ", error.message);
    }
}


async function getElements(driver, selector){
    try{
        // Switch to the frame
        await wait(driver, selector);
        const elements = await driver.findElements(By.xpath(selector));
        return elements;
    }
    catch(error){
        console.log("error in switchToIframe ", error.message);
    }
}

async function getElement(driver, selector, timeout=5000){
    try{
        // Switch to the frame
        await wait(driver, selector, timeout);
        const elements = await driver.findElement(By.xpath(selector));
        return elements;
    }
    catch(error){
        console.log("error in switchToIframe ", error.message);
    }
}

async function getTextFromElement(element){
    try {
        return await element.getText();
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}


async function scrollToElement(driver, element){
    try {
        const deltaY = (await element.getRect()).y
        await driver.sleep(3000)
        await driver.switchTo().defaultContent();
        var iframe = await getElement(driver, altTextAppXpaths.alt_text_iframe);
        await driver.actions()
          .scroll(0, 0, 0, Math.floor(deltaY), iframe)
          .perform()
        await switchToIframe(driver, altTextAppXpaths.alt_text_iframe)
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}

module.exports = {
    sendKeys,
    click,
    wait,
    switchToIframe,
    getElements,
    getElement,
    getTextFromElement,
    scrollToElement,
    doesElementExists
}