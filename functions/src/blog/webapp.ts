import * as express from "express";
import { getLatestBlogs } from "./db";

const webapp = express();

webapp.get("/", async (req, res) => {
  const blogs = await getLatestBlogs();
  res.send(
    blogs.map(
      blog =>
        `<article><h1>${blog.title}</h1><div>${blog.content}</div></article>`
    )
  );
});

export { webapp };
