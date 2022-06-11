// Require
const { Schema, model, Types } = require('mongoose');

// schema for reactions
const ReactionsSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

// Schema for thought
const ThoughtsSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => dateFormat(createdAt)
    },
    username: {
        type: String,
        required: true
    },
    // Validate with reaction schema
    reactions: [ReactionsSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// get reaction count
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// thought model
const Thoughts = model('Thoughts', ThoughtsSchema);

// Export thought module
module.exports = Thoughts;