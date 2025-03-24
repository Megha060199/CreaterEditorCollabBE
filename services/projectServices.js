import axios from 'axios';

export async function fetchProjects(userId, limit = 20, skip = 0) {
  const count = Number(limit) 
  const start = Number(skip) ;

  const url = `${process.env.BASE_API_URL}projects`


  const { data } = await axios.get(url,{
    headers: { 'X-API-Key': process.env.API_KEY }
  });

  const rows = data.split('\n').map(line => line.split(','));

  const total_count = rows.length
  const result = rows.slice(start,start+count)
  const pages =  Math.ceil(total_count/20)
  return { count: result.length, start: start ,rows: result, pages:pages};
}