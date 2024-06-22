const fs = require('fs');
const socialProfile = reuire('../models/socialModel');

//create a social profile
exports.createSocialProfile = async (req, res) => {
    try{
        //check if the user is already created a social profile
        const socialProfile = await SocialProfile.findOne({ userId: req.body.userId });
        if (socialProfile) {
            res.status(400).json({
                status: 'fail',
                message: 'Social Profile already exists'
            });
        }
        //create a new social profile
        const newSocialProfile = await socialProfile.create(req.body);
        res.status(201).json({
            status:'success',
            data: newSocialProfile,
            message: 'Social Profile Created Successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

//get all social profiles
exports.getAllSocialProfiles = async (req,res) =>{
    try{
        const socialProfiles = await SocialProfile.find();
        res.status(200).json({
            status:'success',
            data: socialProfiles
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

//get a social profile
exports.getSocialProfile = async (req,res) => {
    try{
        const socialProfile = await SocialProfile.findById(req.params.id);
        if(!socialProfile){
            res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        }
        res.status(200).json({
            status:'success',
            data: socialProfile
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

//delete a social profile
exports.deleteSocialProfile = async (req,res) => {
    try{
        const socialProfile = await SocialProfile.findById(req.params.id);
        if(!socialProfile){
            res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        }
        await socialProfile.remove();
        res.status(204).json({
            status:'success',
            message: 'Social Profile Deleted Successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

//folow a user
exports.follwoUser = async (req,res) => {
    const { currentUserId, targetUserId } = req.body;
    try {
        const currentUserProfile = await SocialProfile.findOne({ userId: currentUserId });
        const targetUserProfile = await SocialProfile.findOne({ userId: targetUserId });
        if (!currentUserProfile ||!targetUserProfile) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
    if (!currentUserProfile.includes(targetUserProfile)) {
        currentUserProfile.following.push(targetUserProfile);
        targetUserProfile.followers.push(currentUserProfile);
        await currentUserProfile.save();
        await targetUserProfile.save();
        res.status(200).json({
            status:'success',
            data: {
                currentUserProfile,
                targetUserProfile
            },
            message: "Followed Successfully"
        });
    }else{
        res.status(400).json({
            status: 'fail',
            message: 'Already Followed'
        });
    };
    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    };
};

//unfollow a user
exports.unfollowUser = async (req,res) => {
    const { currentUserId, targetUserId } = req.body;
    try{
        const currentUserProfile = await SocialProfile.findOne({ userId: currentUserId });
        const targetUserProfile = await SocialProfile.findOne({ userId: targetUserId });
        if (!currentUserProfile ||!targetUserProfile) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        if (currentUserProfile.includes(targetUserProfile)) {
            currentUserProfile.following.pull(targetUserProfile);
            targetUserProfile.followers.pull(currentUserProfile);
            await currentUserProfile.save();
            await targetUserProfile.save();
            res.status(200).json({
                status:'success',
                data: {
                    currentUserProfile,
                    targetUserProfile
                },
                message: "Unfollowed Successfully"
            });
        }
    }catch{
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};