import axios from 'axios';
import { youtube } from '../utils/youtubeClient.js';

export async function uploadVideoFromUrl({ url, title, description, privacyStatus = 'unlisted' }) {
  const stream = (await axios.get(url, { responseType: 'stream' })).data;

  const response = await youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: { title, description, categoryId: '22' },
      status: { privacyStatus },
    },
    media: { body: stream },
  });

  return response.data;
}
