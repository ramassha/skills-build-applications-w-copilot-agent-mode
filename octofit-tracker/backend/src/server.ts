import express, { Request, Response } from 'express';
import { connectDatabase } from './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const port = Number(process.env.PORT || 8000);

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

// Connect to the database
connectDatabase().catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API is running',
    apiBaseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/'
    ]
  });
});

// Users endpoints
app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json({ resource: 'users', items: users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ resource: 'users', item: user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resource: 'users', id: req.params.id, item: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ resource: 'users', id: req.params.id, item: user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ resource: 'users', id: req.params.id, deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Teams endpoints
app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).populate('leader').populate('members');
    res.json({ resource: 'teams', items: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ resource: 'teams', item: team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

app.get('/api/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('leader').populate('members');
    res.json({ resource: 'teams', id: req.params.id, item: team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

app.put('/api/teams/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ resource: 'teams', id: req.params.id, item: team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

app.delete('/api/teams/:id', async (req: Request, res: Response) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ resource: 'teams', id: req.params.id, deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

// Activities endpoints
app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).populate('userId');
    res.json({ resource: 'activities', items: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ resource: 'activities', item: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

app.get('/api/activities/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    res.json({ resource: 'activities', id: req.params.id, item: activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

app.put('/api/activities/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ resource: 'activities', id: req.params.id, item: activity });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

app.delete('/api/activities/:id', async (req: Request, res: Response) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ resource: 'activities', id: req.params.id, deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

// Leaderboard endpoints
app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({}).sort({ rank: 1 }).populate('userId');
    res.json({ resource: 'leaderboard', items: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.post('/api/leaderboard/', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json({ resource: 'leaderboard', item: entry });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

app.get('/api/leaderboard/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('userId');
    res.json({ resource: 'leaderboard', id: req.params.id, item: entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

app.put('/api/leaderboard/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ resource: 'leaderboard', id: req.params.id, item: entry });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

app.delete('/api/leaderboard/:id', async (req: Request, res: Response) => {
  try {
    await Leaderboard.findByIdAndDelete(req.params.id);
    res.json({ resource: 'leaderboard', id: req.params.id, deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

// Workouts endpoints
app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({});
    res.json({ resource: 'workouts', items: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ resource: 'workouts', item: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

app.get('/api/workouts/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    res.json({ resource: 'workouts', id: req.params.id, item: workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

app.put('/api/workouts/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ resource: 'workouts', id: req.params.id, item: workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

app.delete('/api/workouts/:id', async (req: Request, res: Response) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ resource: 'workouts', id: req.params.id, deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

app.listen(port, () => {
  console.log(`Octofit Tracker API running on ${apiBaseUrl}`);
});
