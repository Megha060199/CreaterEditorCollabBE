import { fetchContentEditorData } from '../services/contentEditorService.js';

export async function getEditorListings(req, res, next) {
  try {
    const { limit, skip } = req.query;
    const editorList = await fetchContentEditorData(limit, skip);
    res.json(editorList);
  } catch (err) {
    next(err);
  }
}
