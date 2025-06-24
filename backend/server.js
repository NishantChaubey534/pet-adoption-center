const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const petRoutes = require('./routes/petRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use('/api/pets', petRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');

  // Only listen if not in test environment
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = app; // Export app for tests
