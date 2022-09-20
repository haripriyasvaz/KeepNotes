
//section 3.10
const chalk=require('chalk')
const yargs=require('yargs')
const notes = require('./notes.js')
const validator=require('validator')

//customize yargs version
yargs.version('1.0.1')

//creating add, remove, read and list command using yargs

//add command
yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
        title:{
            describe:'title of the note',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'body of the note',
            demandOption: true,
            type:'string'

        }
    },
    handler:function(argv){
    notes.addNote(argv.title,argv.body)
    }
})

//remove command
yargs.command({
    command:'remove',
    describe:'removing a new note',
    builder:{
        title:{
            describe:'title of the note',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
    notes.removeNote(argv.title)
    }    
})

//read command
yargs.command({
    command:'read',
    describe:'read the note',
    builder:{
        title:{
            describe:'title of the note',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
    notes.readNotes(argv.title)
    }    
   
})

//list command
yargs.command({
    command:'list',
    describe:'list the note',
    handler:function(){     
        notes.listNotes()
    }
})


//displays all things
//console.log(yargs.argv)

//display only the necessary things
yargs.parse()

//Input
// node app.js add --title="Title of the note" --body="Body of the note"
//Output
// Title:Title of the note
// Body:Body of the note