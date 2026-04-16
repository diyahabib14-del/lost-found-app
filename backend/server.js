require("dotenv").config(); // MUST be first
console.log("URI CHECK:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug (optional but useful)
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect("mongodb+srv://diyahabib14_db_user:admin123@cluster0.ja4mpjx.mongodb.net/lostfound")
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ FULL ERROR:", err.message));

// Schema
const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String, // LOST or FOUND
    contact: String
});

const Item = mongoose.model("Item", ItemSchema);

// Routes

// Add item
app.post("/add", async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.send("Item added");
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all items
app.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).send(err);
    }
});
   

// Server start
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});