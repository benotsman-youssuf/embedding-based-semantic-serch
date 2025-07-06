import express from "express";
import cors from "cors";
import router from "./search/search.routes.js";
import { EmbedToDb } from "./shared/utils/embed.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, async () => {
  try {
    await EmbedToDb();
    console.log("Embedding to DB complete.");
  } catch (err) {
    console.error("Failed to embed to DB:", err);
  }
  console.log(`Server Up on http://localhost:${PORT}`);
});
