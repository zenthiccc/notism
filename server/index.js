import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import noteRoutes from "./routes/notes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/notes", noteRoutes);

const CONNECTION_URL =
  "mongodb+srv://user123:user123@cluster0.aeekc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
