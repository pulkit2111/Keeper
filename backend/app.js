const express = require("express");
const mongoose = require('mongoose');
const cors= require("cors");
const bodyParser = require('body-parser');

const app=express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/Keepernotes');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const notesSchema = new mongoose.Schema({
    title: String,
    content: String
}, {versionKey: false});

const noteDetails = new mongoose.model('notes', notesSchema);

app.get('/', (req,res) => {
    console.log('app is working');
})

app.get('/getNotes', async (req, res) => {
    try {
        const allNotes = await noteDetails.find({});
        res.json(allNotes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/submit', async (req, resp) => {
    try {
        const newNote = new noteDetails(req.body);
        console.log(newNote);
        await newNote.save();
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});


app.listen(5000, () =>{
    console.log("Server is running on port 5000")
})