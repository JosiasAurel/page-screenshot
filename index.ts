import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Page Screenshot API ready");
});

app.get("/screenshot", (req: Request, res: Response) => {
    res.send(req.query.page);
}); 

app.listen(3000, () => console.log("Working on port 3000"));

module.exports = app;