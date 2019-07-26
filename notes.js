const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => (note.title === title))

    debugger

    if( !duplicateNote ) {
        notes.push({
            title: title,
            body: body
        })    
        saveNotes(notes)

        console.log(chalk.bgGreen('Note Added!'))
    }
    else {
        console.log(chalk.bgRed('Note exists already!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => (note.title !== title))

    if ( notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(notesToKeep)    
        console.log(chalk.bgGreen('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.bgGreen('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => (note.title === title))

    if ( noteToRead ) {
        console.log(chalk.inverse(noteToRead.title))
        console.log(noteToRead.body)    
    } else {
        console.log("Can't find that note!")
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}