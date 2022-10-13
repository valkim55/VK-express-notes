const express = require('express');
const router = require('express').Router();
//const {getNotes, saveNotes, deleteNotes} = require('../../public/assets/js/index');
const {notes} = require('../../db/notes.json');

// package that will generate a random id for each new note
const uuid = require('uuid');



router.get('/notes', (req, res) => {
    res.json(notes);
})

router.get('/:id', (req, res) => {
    const foundID = notes.some(note => note.id === parseInt(req.params.id));
    if(foundID) {
        res.json(notes.filter(note => note.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message: `note with the id ${req.params.id} not found`});
    }
})

router.post('/notes', (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    // check for the note to have both title and text to avoid saving empty notes
    if(!newNote.title || !newNote.text) {
        res.status(400).json({message: 'Please save with title and content'});
    } else {
        notes.push(newNote);
        res.json(notes);
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