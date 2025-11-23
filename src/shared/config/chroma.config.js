import { ChromaClient } from "chromadb";
import { CohereEmbeddingFunction } from "@chroma-core/cohere";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

// Chroma DB Client - configurable for different environments
export const client = new ChromaClient({
  host: process.env.CHROMA_HOST || 'chroma',
  port: process.env.CHROMA_PORT || '8000',
  ssl: process.env.CHROMA_SSL === 'true' || false
});

// Cohere embedder
export const embedder = new CohereEmbeddingFunction({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-v4.0",
});

//رياض الصالحين JSON
export const data = JSON.parse(
  await readFile("./data/riyad_assalihin.json", "utf-8")
);

export const collection = await client.getOrCreateCollection({
  name: "hadith",
  embeddingFunction: embedder,
});
