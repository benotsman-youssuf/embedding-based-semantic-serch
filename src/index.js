import express from "express";
import cors from "cors";
import router from "./search/search.routes.js";
import { EmbedToDb } from "./shared/utils/embed.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use('/api', router)

app.use(errorHandler)



app.listen(PORT, async () => {
    await EmbedToDb()
    console.log("Server is running on port 3000");
});
