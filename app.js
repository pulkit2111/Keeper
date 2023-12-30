const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");

const app= express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1/Keepernotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const notesSchema = new mongoose.Schema({
    title: String,
    content: String
},{versionKey: false});

const notes = new mongoose.model('notes', notesSchema);

app.post('/', async(req,res) =>{
    try {
        const {title, content} = req.body;
        // const newUser = new userDetails({
        //     email: req.body.email,
        //     password: hash
        // });
        const newNote = new notes({title, content});
        await newNote.save();
        res.status(200).json({ message: 'Note saved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
      }
})

app.listen(5000,function(){
    console.log("Server is running on port 5000.")
})
