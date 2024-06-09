const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../middleware/userMiddleware');
const config = require('../config/config');

async function registerUser(userInfo) {
    const { username, firstName, lastName, email, password } = userInfo;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return { status: 400, message: 'Username or email already exists' };
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({ username, firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        const user = await User.findOne({ username });
    
        return {
            status: 201, message: 'User registered successfully',
            userId: user._id, username: user.username
        };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}  

async function loginUser(username, password) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return { status: 400, message: 'Invalid username or password' };
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { status: 400, message: 'Invalid username or password' };
        }
    
        const token = jwt.sign({ userId: user._id, preferences: user.preferences }, config.jwtSecret);
        return { status: 200, message: 'Login successful', token: token, userId: user._id };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}  

async function userInformation(userId, userInfo, file) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
    
        user.location = userInfo.location;
        user.birthday = userInfo.birthday;
        user.profilePic = file ? file.path : '';
        user.bio = userInfo.bio;
        user.nationality = userInfo.nationality;
        user.mobileNumber = userInfo.mobileNumber;
        await user.save();
    
        return { status: 200, message: 'User information updated successfully' };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}

async function logout() {
    try {
        req.session.destroy();
        return { status: 200, message: 'Logout successful' };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal server error' };
    }
}

module.exports = { registerUser, loginUser, userInformation, logout };