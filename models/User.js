const { Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //  validate correct email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
            ]
},
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

// get length of how many friends user has
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
// create the Users model
const Users = model('Users', usersSchema);

//export the module
module.exports = Users;