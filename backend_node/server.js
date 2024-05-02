const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  }
}));

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

const mongoURI = "mongodb+srv://aemoein:VXszeraoKlzG0P2a@cluster0-trvlo.b3pdnw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-TRVLO";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    req.session.userId = user._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password
  } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './ProfilePics';
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.body.username + ext);
  }
});

const upload = multer({ storage: storage });

app.post('/userInfoSignUp', upload.single('profilePic'), async (req, res) => {
  const {
    username,
    location,
    birthday,
    bio,
    nationality,
    mobileNumber
  } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.location = location;
    user.birthday = birthday;
    user.profilePic = req.file ? req.file.path : '';
    user.bio = bio;
    user.nationality = nationality;
    user.mobileNumber = mobileNumber;

    await user.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/setUserPreferences', async (req, res) => {
  const { username, preferences } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.preferences = preferences;

    await user.save();

    res.status(200).json({ message: 'User preferences updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profilePicUrl = '';
    if (user.profilePic) {
      profilePicUrl = req.protocol + '://' + req.get('host') + '/' + user.profilePic;
    }

    res.status(200).json({ user: { ...user.toObject(), profilePicUrl } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/checkLoggedIn', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.session.isLoggedIn = true;

    let profilePicUrl = '';
    if (user.profilePic) {
      profilePicUrl = req.protocol + '://' + req.get('host') + '/' + user.profilePic;
    }

    res.status(200).json({ user: { ...user.toObject(), profilePicUrl } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});