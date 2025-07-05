import chunk from "./chunk.js";
import { data, collection } from "../config/chroma.config.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const EmbedToDb = async () => {
  try {
    const count = await collection.count();
    console.log(`Current collection count: ${count}`);

    if (count === 0) {
      const chunks = chunk(data.hadiths, 10);
      let batch = 0;
      for (const chunk of chunks) {
        try {
          console.log(`🔄 Embedding batch ${++batch} of ${chunks.length}...`);
          await collection.add({
            ids: chunk.map((p) => p.id.toString()),
            documents: chunk.map((p) => p.english.text.toString()),
            metadatas: chunk.map((p) => ({
              ar: p.arabic.toString(),
            })),
          });
          console.log(`✅ Successfully embedded batch ${batch}`);
          await sleep(8000);
        } catch (chunkError) {
          console.error('❌ Error adding chunk to collection:', chunkError);
          throw chunkError; // Re-throw to stop processing if chunk fails
        }
      }
    } else {
      console.log('✅ Collection already populated and ready to work');
    }
  } catch (error) {
    console.error('🚨 Error in EmbedToDb:', error);
    throw error; // Re-throw to allow calling code to handle the error
  }
};
