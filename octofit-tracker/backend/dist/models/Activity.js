"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityType: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'weightlifting', 'walking'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number
    },
    calories: {
        type: Number,
        required: true
    },
    pointsEarned: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
