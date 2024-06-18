const { User } = require('../middleware/userMiddleware');

async function getUserProfile(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    let profilePicUrl = '';
    if (user.profilePic) {
      profilePicUrl = req.protocol + '://' + req.get('host') + '/' + user.profilePic;
    }

    return { status: 200, user: { ...user.toObject(), profilePicUrl } };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error' };
  }
}

async function checkLoggedIn(req) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    req.session.isLoggedIn = true;

    let profilePicUrl = '';
    if (user.profilePic) {
      profilePicUrl = req.protocol + '://' + req.get('host') + '/' + user.profilePic;
    }

    console.log(profilePicUrl)

    return { status: 200, user: { ...user.toObject(), profilePicUrl } };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error' };
  }
}

module.exports = {
  getUserProfile,
  checkLoggedIn,
};
