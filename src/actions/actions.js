const {By, until} = require("selenium-webdriver");

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

async function wait(driver, selector){
    for(var idx = 0; idx < 2 ; idx ++){
        try{
            await driver.wait(until.elementLocated(By.xpath(selector)), 5000);
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

module.exports = {
    sendKeys,
    click,
    wait,
    switchToIframe
}