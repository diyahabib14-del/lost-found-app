const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// SCHEMA
const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    contact: String,
    image: String
});

const Item = mongoose.model("Item", itemSchema);

// ADD ITEM
app.post("/items", async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.send("Item Added");
});

// GET ITEMS
app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// DELETE ITEM
app.delete("/delete/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

// ROOT
app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});