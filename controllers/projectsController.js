import { fetchProjects } from '../services/projectServices.js';

export async function getCurrentProjects(req, res, next) {
  try {
    const { userId, limit,skip} = req.query;
    const projects = await fetchProjects(userId,limit,skip);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}