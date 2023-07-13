import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import Routerr from "./routes/ModelsRoute.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static("public"));
app.use(Routerr);

app.listen(port, () => {
  console.log(`Server Up on Port ${port}`);
});
