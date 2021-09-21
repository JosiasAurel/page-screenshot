import express, { Application, Request, Response } from "express";
import puppeteer from "puppeteer";
import { writeFileSync, unlinkSync } from "fs";
import { nanoid } from "nanoid";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Page Screenshot API ready");
});

app.get("/screenshot", (req: Request, res: Response) => {

    // get the queried page
    const webPage: any = req.query.page;
    const randomImageName: string = nanoid(6);
    
    // initialize and execute puppeteer screenshot
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(webPage);
        await page.screenshot({ path: `/tmp/${randomImageName}.png` });
        await browser.close(); // close browser instance

        // respond with the generated image
        await res.sendFile(`/tmp/${randomImageName}.png`);
      })().then(_ => {
        // delete the image
        unlinkSync(`/tmp/${randomImageName}.png`);
      });
}); 

app.listen(3000, () => console.log("Working on port 3000"));

module.exports = app;