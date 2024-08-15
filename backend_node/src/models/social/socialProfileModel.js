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
          }],
          default:[]
    },
    followings: {
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }],
          default:[]
    },
    saved:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
          }],
          default:[]
    },
    blocked: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    }
},
{timestamps: true}
);

const SocialProfile = mongoose.model('SocialProfile', socialProfileSchema, 'social');

module.exports = SocialProfile;