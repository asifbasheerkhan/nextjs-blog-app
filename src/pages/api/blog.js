import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "public", "blogs.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read the file" });
      return;
    }

    const blogs = JSON.parse(data);
    res.status(200).json(blogs);
  });
}
