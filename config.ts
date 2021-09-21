
import chrome from "chrome-aws-lambda";
import core from "puppeteer-core";

async function getOptions(): Promise<any> {
    const options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    };

    return options;
}

async function screenshot(webPage: string, randomImageName: string): Promise<any> {
    const options = await getOptions();
    const browser = await core.launch(options);
    const page = await browser.newPage();
    await page.goto(webPage);
    await page.screenshot({ path: `/tmp/${randomImageName}.png` });
    await browser.close(); // close browser instance
}

export { getOptions, screenshot };