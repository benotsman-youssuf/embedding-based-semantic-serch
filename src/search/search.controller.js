import { getSimilarHadiths } from "./search.service.js"

export const search = async (req, res ,next) => {
    const { queryText, nResults } = req.body;
    try {
        const response = await getSimilarHadiths(queryText, nResults);
        res.json(response);
    } catch (error) {
        next(error)
    }
}

