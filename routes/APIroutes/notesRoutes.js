const express = require('express');
const router = require('express').Router();
const {notes} = require('../../db/notes.json');
const fs = require('fs');
const path = require('path');

// package that will generate a random id for each new note
const uuid = require('uuid');


// ========== GET handler ==========
// reads and returns all notes in notes.json as a response
router.get('/api/notes', (req, res) => {
    return res.json(notes);
})

// ========== POST handler ==========
// create a separate function that will generate a new req.body and write it into array of notes in json file
function addNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify({notes: notesArray}, null, 2),);
    return note;
};

// could do this in createNewNote but for practicing code separation create another function that will check for title and text to be present
function validateNewNote(note) {
    if(!note.title || !note.text) {
        return false
    } else {
        return true;;
    }
};

// receives new note, save it to request body and writes into notes.json file
router.post('/api/notes', (req, res) => {
    req.body.id = uuid.v4();    // use uuid module to create a random unique id for each newly created req.body
    if(!validateNewNote(req.body)) {
        res.status(400).json({message: 'Please save with the proper format: title and content'});
    } else {
    addNewNote(req.body, notes);
    return res.json(notes);   // took notes out of curly braces
    }
});

// ========== DELETE handler ==========
// given an id in URL path deletes the note with that ID and returns an updated notes.json
router.delete('/api/notes/:id', (req, res) => {
    const deleteNote = notes.find(({id}) => id == req.params.id);
    if(deleteNote) {
        res.json({message: 'note successfully deleted', notes: notes.filter(note => note.id !== req.params.id)});
        fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify({notes: notes.filter(note => note.id !== req.params.id)}, null, 2));
        return; 
    }  
});

module.exports = router;