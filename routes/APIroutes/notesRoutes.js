//const express = require('express');
const router = require('express').Router();
const notes = require('../../db/notes.json');
const fs = require('fs');
const path = require('path');

// package that will generate a random id for each new note
const uuid = require('uuid');


router.get('/notes', (req, res) => {
    res.json(notes);
})

router.get('/notes/:id', (req, res) => {
    const foundID = notes.some(note => note.id === parseInt(req.params.id));
    if(foundID) {
        res.json(notes.filter(note => note.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message: `note with the id ${req.params.id} not found`});
    }
});


// create a separate function that will generate a new req.body and write it into array of notes in json file
function addNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify(newNote, null, 2));
    return newNote;   
};

// could do this in createNewNote but for practicing code separation create another function that will check for title and text to be present
function validateNewNote(newNote) {
    if(!newNote.title || !newNote.text) {
        return false
    } else {
        return true;;
    }
};

// use uuid module to create a random unique id for each newly created req.body
router.post('/notes', (req, res) => {
    req.body.id = uuid.v4();
    if(!validateNewNote(req.body)) {
        res.status(400).json({message: 'Please save with the proper format: title and content'});
    } else {
    const newNote = addNewNote(req.body, notes);
    res.json(newNote);
    }
});

router.delete('/:id', (req, res) => {
    const foundID = notes.some(note => note.id === parseInt(req.params.id));
    if(foundID) {
        res.json({message: 'note successfully deleted',
        notes: notes.filter(note => note.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({message: `note with the id ${req.params.id} not found`})
    }
});

module.exports = router;