import axios from 'axios';

export async function fetchContentEditorData(limit = 50, skip = 0,q='') {
  const count = Number(limit) || 10;
  const start = Number(skip) ;

  const url = `${process.env.BASE_API_URL}/editorListings`


  const { data } = await axios.get(url,{
    headers: { 'X-API-Key': process.env.API_KEY },
  });


  const raw_str = data.split('\n').map(line => line.split(','));
  const [header, ...rows] = raw_str;
  
  const filtered = q
  ? rows.filter(row =>
      row.some(cell =>
        String(cell).toLowerCase().includes(q.toLowerCase())
      )
    )
  : rows;
  const total = filtered.length;
  const paginated = filtered.slice(start, start + count);
  const pages = Math.ceil(total / count);
  return { header: header, count: paginated.length, skip: start , total:total, rows: paginated, pages:pages };
}