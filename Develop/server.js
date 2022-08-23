const express = require('express');
const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET /api/notes 
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../Develop/db/db.json'));
});

// POST /api/notes

app.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('../Develop/db/db.json');
  db = JSON.parse(db);
  res.json(db);
  // creating body for note
  let userNote = {
    title: req.body.title,
    text: req.body.text,
    // creating unique id for each note
    id: uniqid(),
  };
  // pushing created note to be written in the db.json file
  db.push(userNote);
  fs.writeFileSync('../Develop/db/db.json', JSON.stringify(db));
  res.json(db);

});


// DELETE /api/notes/
app.delete('/api/notes/:id', (req, res) => {
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync('../Develop/db/db.json'))
  // removing note with id
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync('../Develop/db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
  
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT} 🚀`)
);