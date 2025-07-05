import { collection } from "../shared/config/chroma.config.js";

export const getSimilarHadiths = async (queryText, nResults) => {
  const queryResult = await collection.query({
    queryTexts: [queryText],
    nResults: nResults,
  });
  const response = queryResult.ids[0].map((id, idx) => ({
    id,
    en: queryResult.documents[0][idx],
    ar: queryResult.metadatas[0][idx]?.ar || "",
  }));

  return response;
};
