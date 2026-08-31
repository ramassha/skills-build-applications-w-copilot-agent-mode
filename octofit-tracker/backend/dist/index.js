"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
// Connect to the database
(0, database_1.connectDatabase)().catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});
app.get('/api', (_req, res) => {
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
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User_1.User.find({});
        res.json({ resource: 'users', items: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.post('/api/users/', async (req, res) => {
    try {
        const user = await User_1.User.create(req.body);
        res.status(201).json({ resource: 'users', item: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id);
        res.json({ resource: 'users', id: req.params.id, item: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ resource: 'users', id: req.params.id, item: user });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User_1.User.findByIdAndDelete(req.params.id);
        res.json({ resource: 'users', id: req.params.id, deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
// Teams endpoints
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find({}).populate('leader').populate('members');
        res.json({ resource: 'teams', items: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const team = await Team_1.Team.create(req.body);
        res.status(201).json({ resource: 'teams', item: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
app.get('/api/teams/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findById(req.params.id).populate('leader').populate('members');
        res.json({ resource: 'teams', id: req.params.id, item: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
app.put('/api/teams/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ resource: 'teams', id: req.params.id, item: team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
app.delete('/api/teams/:id', async (req, res) => {
    try {
        await Team_1.Team.findByIdAndDelete(req.params.id);
        res.json({ resource: 'teams', id: req.params.id, deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
// Activities endpoints
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find({}).populate('userId');
        res.json({ resource: 'activities', items: activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.create(req.body);
        res.status(201).json({ resource: 'activities', item: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
app.get('/api/activities/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id).populate('userId');
        res.json({ resource: 'activities', id: req.params.id, item: activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
app.put('/api/activities/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ resource: 'activities', id: req.params.id, item: activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
app.delete('/api/activities/:id', async (req, res) => {
    try {
        await Activity_1.Activity.findByIdAndDelete(req.params.id);
        res.json({ resource: 'activities', id: req.params.id, deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
// Leaderboard endpoints
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({}).sort({ rank: 1 }).populate('userId');
        res.json({ resource: 'leaderboard', items: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
app.post('/api/leaderboard/', async (req, res) => {
    try {
        const entry = await Leaderboard_1.Leaderboard.create(req.body);
        res.status(201).json({ resource: 'leaderboard', item: entry });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
app.get('/api/leaderboard/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.Leaderboard.findById(req.params.id).populate('userId');
        res.json({ resource: 'leaderboard', id: req.params.id, item: entry });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
app.put('/api/leaderboard/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ resource: 'leaderboard', id: req.params.id, item: entry });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update leaderboard entry' });
    }
});
app.delete('/api/leaderboard/:id', async (req, res) => {
    try {
        await Leaderboard_1.Leaderboard.findByIdAndDelete(req.params.id);
        res.json({ resource: 'leaderboard', id: req.params.id, deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete leaderboard entry' });
    }
});
// Workouts endpoints
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find({});
        res.json({ resource: 'workouts', items: workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json({ resource: 'workouts', item: workout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
app.get('/api/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findById(req.params.id);
        res.json({ resource: 'workouts', id: req.params.id, item: workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
app.put('/api/workouts/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ resource: 'workouts', id: req.params.id, item: workout });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
app.delete('/api/workouts/:id', async (req, res) => {
    try {
        await Workout_1.Workout.findByIdAndDelete(req.params.id);
        res.json({ resource: 'workouts', id: req.params.id, deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
app.listen(port, () => {
    console.log(`Octofit Tracker API running on ${apiBaseUrl}`);
});
