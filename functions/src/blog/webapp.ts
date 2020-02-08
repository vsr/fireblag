import * as express from "express";

const webapp = express();

webapp.get("/", (req, res) => {
  res.send("Hello");
});

export { webapp };
