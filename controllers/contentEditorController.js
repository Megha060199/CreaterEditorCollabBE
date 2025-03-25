import { fetchContentEditorData } from '../services/contentEditorService.js';

export async function getEditorListings(req, res, next) {
  try {
    const { limit, skip,q } = req.query;
    const editorList = await fetchContentEditorData(limit, skip,q);
    res.json(editorList);
  } catch (err) {
    next(err);
  }
}
