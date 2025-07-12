const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
  const { recipientId, skillOffered, skillWanted, message } = req.body;
  try {
    const requester = await User.findById(req.user.id);
    const recipient = await User.findById(recipientId);
    if (!requester || !recipient) return res.status(404).json({ msg: 'User not found' });

    const swapRequest = new SwapRequest({
      requester: req.user.id,
      recipient: recipientId,
      skillOffered,
      skillWanted,
      message
    });

    await swapRequest.save();
    res.json(swapRequest);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  const { status } = req.query;
  try {
    const requests = await SwapRequest.find({ $or: [{ requester: req.user.id }, { recipient: req.user.id }] })
      .populate('requester', 'name')
      .populate('recipient', 'name')
      .where(status ? { status } : {});
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const request = await SwapRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    if (request.recipient.toString() !== req.user.id && request.requester.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    if (request.requester.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await request.deleteOne();
    res.json({ msg: 'Request deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;