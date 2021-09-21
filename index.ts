import express, { Application, Request, Response } from "express";
import puppeteer from "puppeteer";
import { writeFileSync, unlinkSync } from "fs";
import { nanoid } from "nanoid";
import { screenshot } from "./config";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Page Screenshot API ready");
});

app.get("/screenshot", async (req: Request, res: Response) => {

    // get the queried page
    const webPage: any = await req.query.page;
    const randomImageName: string = await nanoid(6);
    
    // initialize and execute puppeteer screenshot
    screenshot(webPage, randomImageName).then(_ => {
        res.sendFile(`/tmp/${randomImageName}.png`);
        // delete the image
        unlinkSync(`/tmp/${randomImageName}.png`);
      });
}); 

app.listen(3000, () => console.log("Working on port 3000"));

module.exports = app;