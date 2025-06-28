const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const petRoutes = require('./routes/petroutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON syntax" });
  }
  next();
});

const { swaggerUi, specs } = require('./swagger'); // adjust path
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/openapi.json", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});


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
