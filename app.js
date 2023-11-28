import express from "express";
import bodyParser from "body-parser";
import _ from "lodash"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const port = 3000;

let newItems = [];

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let d = new Date();

  let today = d.toLocaleDateString("en-US", options);

  res.render("list", { thisDay: today, newListItem: newItems });
});

app.post("/", (req, res) => {
  let newItem = req.body.newItem;
  newItems.push(newItem);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`The app is running on ${port}`);
});
