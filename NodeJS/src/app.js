import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import routerProduct from "./routes/product";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//routes
app.use("/api", routerProduct);

//connect to database and start server
const port = process.env.PORT;
const db = process.env.DATABASE;
mongoose
  .connect(db)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`Server running: ${port}`));
