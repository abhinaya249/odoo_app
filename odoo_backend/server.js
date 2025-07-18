const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     require('dotenv').config();

     const app = express();

     // Enable CORS for localhost:3000
     app.use(cors({ origin: 'http://localhost:3000' }));
     app.use(express.json());

     const PORT = process.env.PORT || 5000;

     mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.log(err));

     app.use('/api/auth', require('./routes/auth'));
     app.use('/api/users', require('./routes/users'));
     app.use('/api/swap-requests', require('./routes/swapRequests'));

     app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
     });

     module.exports = app;