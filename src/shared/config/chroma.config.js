import { ChromaClient } from "chromadb";
import { CohereEmbeddingFunction } from "@chroma-core/cohere";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Chroma DB Client
export const client = new ChromaClient();

// Cohere embedder
export const embedder = new CohereEmbeddingFunction({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-english-v3.0",
});

//رياض الصالحين JSON
export const data = JSON.parse(
  await fs.promises.readFile("./data/riyad_assalihin.json", "utf-8")
);

export const collection = await client.getOrCreateCollection({
  name: "book",
  embeddingFunction: embedder,
});
