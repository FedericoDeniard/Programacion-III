import { KEYS } from "./constants/keys/index";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("../javascript"));

app.use("/", mainRouter);

app.use(errorHandler);

app.listen(KEYS.PORT, () => {
    console.log("Escuchando en el puerto " + KEYS.PORT);
});
