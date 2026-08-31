"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await Promise.all([
            User_1.User.deleteMany({}),
            Team_1.Team.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            Leaderboard_1.Leaderboard.deleteMany({}),
            Workout_1.Workout.deleteMany({})
        ]);
        console.log('Cleared existing data');
        // Create sample users
        const users = await User_1.User.create([
            {
                username: 'alex_runner',
                email: 'alex@example.com',
                passwordHash: 'hashedpassword123',
                displayName: 'Alex Runner',
                bio: 'Marathon enthusiast and fitness coach',
                points: 2500
            },
            {
                username: 'jamie_cyclist',
                email: 'jamie@example.com',
                passwordHash: 'hashedpassword456',
                displayName: 'Jamie Cyclist',
                bio: 'Love cycling and mountain biking',
                points: 2200
            },
            {
                username: 'casey_swimmer',
                email: 'casey@example.com',
                passwordHash: 'hashedpassword789',
                displayName: 'Casey Swimmer',
                bio: 'Swimming coach and triathlete',
                points: 1900
            },
            {
                username: 'morgan_lifter',
                email: 'morgan@example.com',
                passwordHash: 'hashedpassword012',
                displayName: 'Morgan Lifter',
                bio: 'Strength training and bodybuilding',
                points: 2100
            },
            {
                username: 'taylor_walker',
                email: 'taylor@example.com',
                passwordHash: 'hashedpassword345',
                displayName: 'Taylor Walker',
                bio: 'Daily walker and nature lover',
                points: 1500
            }
        ]);
        console.log(`Created ${users.length} users`);
        // Create sample teams
        const teams = await Team_1.Team.create([
            {
                name: 'Marathon Mavericks',
                description: 'A team dedicated to running and marathons',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id, users[3]._id],
                totalPoints: 6800
            },
            {
                name: 'Cycle Champions',
                description: 'Road cycling and mountain biking enthusiasts',
                leader: users[1]._id,
                members: [users[1]._id, users[4]._id],
                totalPoints: 3700
            },
            {
                name: 'Aquatic Aces',
                description: 'Swimming and water sports team',
                leader: users[2]._id,
                members: [users[2]._id, users[0]._id],
                totalPoints: 4400
            }
        ]);
        console.log(`Created ${teams.length} teams`);
        // Create sample activities
        const activities = await Activity_1.Activity.create([
            {
                userId: users[0]._id,
                activityType: 'running',
                duration: 60,
                distance: 10,
                calories: 800,
                pointsEarned: 100,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                userId: users[0]._id,
                activityType: 'running',
                duration: 45,
                distance: 7.5,
                calories: 600,
                pointsEarned: 75,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                userId: users[1]._id,
                activityType: 'cycling',
                duration: 90,
                distance: 40,
                calories: 900,
                pointsEarned: 120,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                userId: users[1]._id,
                activityType: 'cycling',
                duration: 60,
                distance: 25,
                calories: 700,
                pointsEarned: 80,
                date: new Date()
            },
            {
                userId: users[2]._id,
                activityType: 'swimming',
                duration: 45,
                distance: 2,
                calories: 500,
                pointsEarned: 75,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                userId: users[3]._id,
                activityType: 'weightlifting',
                duration: 60,
                calories: 400,
                pointsEarned: 80,
                date: new Date()
            },
            {
                userId: users[4]._id,
                activityType: 'walking',
                duration: 30,
                distance: 3,
                calories: 150,
                pointsEarned: 30,
                date: new Date()
            }
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create sample leaderboard entries
        const leaderboard = await Leaderboard_1.Leaderboard.create([
            {
                userId: users[0]._id,
                username: users[0].username,
                totalPoints: 2500,
                rank: 1,
                totalActivities: 2
            },
            {
                userId: users[1]._id,
                username: users[1].username,
                totalPoints: 2200,
                rank: 2,
                totalActivities: 2
            },
            {
                userId: users[3]._id,
                username: users[3].username,
                totalPoints: 2100,
                rank: 3,
                totalActivities: 1
            },
            {
                userId: users[2]._id,
                username: users[2].username,
                totalPoints: 1900,
                rank: 4,
                totalActivities: 1
            },
            {
                userId: users[4]._id,
                username: users[4].username,
                totalPoints: 1500,
                rank: 5,
                totalActivities: 1
            }
        ]);
        console.log(`Created ${leaderboard.length} leaderboard entries`);
        // Create sample workouts
        const workouts = await Workout_1.Workout.create([
            {
                name: 'Beginner Running Plan',
                description: 'A 5K training plan for beginners',
                difficulty: 'beginner',
                duration: 30,
                exercises: [
                    { name: 'Warm-up walk', sets: 1, reps: 5 },
                    { name: 'Light jog', sets: 3, reps: 10 },
                    { name: 'Cool-down walk', sets: 1, reps: 5 }
                ],
                recommendedFor: ['running', 'endurance']
            },
            {
                name: 'Full Body Strength',
                description: 'Complete body weightlifting routine',
                difficulty: 'intermediate',
                duration: 60,
                exercises: [
                    { name: 'Squats', sets: 4, reps: 8 },
                    { name: 'Bench Press', sets: 4, reps: 8 },
                    { name: 'Deadlifts', sets: 3, reps: 5 },
                    { name: 'Rows', sets: 3, reps: 8 }
                ],
                recommendedFor: ['strength', 'weightlifting']
            },
            {
                name: 'HIIT Cardio Blast',
                description: 'High intensity interval training for cardio',
                difficulty: 'advanced',
                duration: 30,
                exercises: [
                    { name: 'Burpees', sets: 3, reps: 30 },
                    { name: 'Mountain Climbers', sets: 3, reps: 30 },
                    { name: 'Jump Squats', sets: 3, reps: 20 },
                    { name: 'High Knees', sets: 3, reps: 30 }
                ],
                recommendedFor: ['cardio', 'endurance']
            },
            {
                name: 'Swimming Technique',
                description: 'Improve swimming technique and speed',
                difficulty: 'intermediate',
                duration: 45,
                exercises: [
                    { name: 'Freestyle', sets: 5, reps: 100 },
                    { name: 'Backstroke', sets: 3, reps: 50 },
                    { name: 'Breaststroke', sets: 3, reps: 50 }
                ],
                recommendedFor: ['swimming', 'endurance']
            },
            {
                name: 'Cycling Endurance',
                description: 'Build cycling endurance for long distances',
                difficulty: 'intermediate',
                duration: 90,
                exercises: [
                    { name: 'Steady pace', sets: 1, reps: 60 },
                    { name: 'Hill climbs', sets: 3, reps: 10 },
                    { name: 'Speed intervals', sets: 5, reps: 3 }
                ],
                recommendedFor: ['cycling', 'endurance']
            }
        ]);
        console.log(`Created ${workouts.length} workouts`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
