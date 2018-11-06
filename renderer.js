// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app, ipcRenderer} = require('electron')
const fs = require('fs')
const Remarkable = require('remarkable')
const md = new Remarkable()

ipcRenderer.on('opened-file', (event, path) => {
    // Open a file when the user picks one from the dialog
    let content = document.getElementById('content')
    content.innerHTML = `opening ${path}`
    fs.readFile(path.toString(), {}, (err, data) =>{ 
        content.innerHTML = "opened"
        if(err) throw err
        // put the contents of the file into the content div
        content.innerHTML = md.render(data.toString())
    })
    content.innerHTML = "done"
})