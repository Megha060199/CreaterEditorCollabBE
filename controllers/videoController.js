import * as videoService from '../services/videoService.js';

export const uploadFromUrl = async (req, res, next) => {
  try {
    const { url, title, description, privacyStatus } = req.body;
    if (!url) return res.status(400).json({ error: 'video URL is required' });

    const video = await videoService.uploadVideoFromUrl({ url, title, description, privacyStatus });
    res.status(201).json(video);
  } catch (err) {
    console.error('Upload error:', err);
    next(err);
  }
};
