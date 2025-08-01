require('dotenv').config({ path: __dirname + '/.env' });
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));


app.use(express.json());

const { MONGO_URI, PORT } = process.env;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}
const port = PORT || 3001;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
const userSchema = new mongoose.Schema({
  username: String,
  message: String
});

const User = mongoose.model('User', userSchema, 'test');

app.get('/',(req,res)=>{
  res.send(" backend deployed successfully ! ")
})
app.post('/api/save', async (req, res) => {
  const { username, message } = req.body;
  const newUser = new User({ username, message });
  await newUser.save();
  res.status(201).json({ msg: "Saved" });
});

app.get('/api/message/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (user) res.json({ message: user.message });
  else res.status(404).json({ msg: "User not found" });
});



app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// https://render-test-o0hu.onrender.com
// https://frontend-client-705j.onrender.com