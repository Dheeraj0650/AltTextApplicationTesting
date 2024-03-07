require('dotenv').config()
const {seleniumDriver} = require("./src/browser/selenium_driver");
const {loginToCanvas} = require("./src/testcases/canvasLogin");

async function main(){
    let driver = await seleniumDriver();
    loginToCanvas(driver);
}

main();
