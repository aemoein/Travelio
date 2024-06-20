const mongoose = require('mongoose');

const socialProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followers: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }]
    },
    following: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }]
    },
    saved:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
          }]
    }
});

const SocialProfile = mongoose.model('SocialProfile', socialProfileSchema);

module.exports = SocialProfile;