"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    passwordHash: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
