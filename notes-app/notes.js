const fs = require('fs')
const chalk=require('chalk')


const getNotes = function () {
    return 'Your notes...'
}
//first we load the preexisting note
//then we add notes to it by pushing the title and body from the user to the empty array (care is taken not to add the duplicate version)
//then we save the notes in the json format
const addNote =  (title, body)=> {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note) =>  note.title === title)//single statement arrow function no need for return statements

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    const keepNotes=notes.filter((note)=> note.title!==title)
    if (notes.length>keepNotes.length)
    {
        console.log(chalk.green.inverse('NOTE REMOVED!'))
    }
    else
    console.log(chalk.red.inverse('No Note Found!'))
    saveNotes(keepNotes)

}

const listNotes=()=>{
    console.log(chalk.inverse('Your Notes:'))
    const notes=loadNotes()
    notes.forEach((note) => {
    console.log(note.title)   
    });

}

const readNotes=(title)=>{
    const notes=loadNotes()
    const matchingnote=notes.find((note)=>note.title===title)
    if(matchingnote){
        console.log(chalk.yellow.bold( matchingnote.title))
        console.log( matchingnote.body)
    }
    else
    {
     console.log(chalk.red.inverse('ERROR:')+chalk.red(' No matching note found!'))
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}