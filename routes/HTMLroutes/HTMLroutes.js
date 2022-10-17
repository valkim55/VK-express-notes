const path = require('path');
const express = require('express');
const router = require('express').Router();

// root path - returns index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

// returns notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// 'wild card' path - returns index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


module.exports = router;