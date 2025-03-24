import axios from 'axios';

export async function fetchContentEditorData(limit = 50, skip = 0) {
  const count = Number(limit) || 10;
  const start = Number(skip) ;

  const url = `${process.env.BASE_API_URL}/editorListings`


  const { data } = await axios.get(url,{
    headers: { 'X-API-Key': process.env.API_KEY },
  });
  const rows = data.split('\n').map(line => line.split(','));
  const result = rows.slice(start,start+count)
  const total_count = rows.length
  const pages =  Math.ceil(total_count/20)
  return { count: result.length, skip: start , rows: result,pages:pages };
}