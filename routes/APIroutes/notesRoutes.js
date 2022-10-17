const express = require('express');
const router = require('express').Router();
const {notes} = require('../../db/notes.json');
const fs = require('fs');
const path = require('path');

// package that will generate a random id for each new note
const uuid = require('uuid');



// ========== GET handler ==========
// returns all notes in notes.json as a response
router.get('/', (req, res) => {
    return res.json(notes);
})


// ========== POST handler ==========
// create a separate function that will generate a new req.body and write it into array of notes in json file
function addNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify({notes: notesArray}, null, 2));
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

// use uuid module to create a random unique id for each newly created req.body
router.post('/', (req, res) => {
    req.body.id = uuid.v4();
    if(!validateNewNote(req.body)) {
        res.status(400).json({message: 'Please save with the proper format: title and content'});
    } else {
    const note = addNewNote(req.body, notes);
    return res.json(notes);
    }
});


// ========== DELETE handler ==========
router.delete('/:id', (req, res) => {
    
    const deleteNote = notes.find(({id}) => id == req.params.id);
    if(!deleteNote) {
        res.status(400).json({message: `note with the parameters ${req.query} not found`})
    } else {
        res.json({message: 'note successfully deleted', notes: notes.filter(note => note.id !== req.params.id)})
    }
        //: ;
    // const index = notes.indexOf(deleteNote);
    // notes.splice(index, 1);
    
});

module.exports = router;