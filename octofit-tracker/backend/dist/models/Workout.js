"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number
        }
    ],
    recommendedFor: [String]
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
