const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/profile', auth, async (req, res) => {
  const { name, location, availability, skillsOffered, skillsWanted, isPublic } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.location = location || user.location;
    user.availability = availability || user.availability;
    user.skillsOffered = skillsOffered || user.skillsOffered;
    user.skillsWanted = skillsWanted || user.skillsWanted;
    user.isPublic = isPublic !== undefined ? isPublic : user.isPublic;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/:id/feedback', auth, async (req, res) => {
  const { feedback, rating } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.rating = (user.rating * (user.feedbackCount || 0) + rating) / ((user.feedbackCount || 0) + 1);
    user.feedbackCount = (user.feedbackCount || 0) + 1;
    await user.save();
    res.json({ msg: 'Feedback recorded' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user || !user.isPublic) return res.status(404).json({ msg: 'User not found or profile is private' });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;