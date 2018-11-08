// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app, ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')

ipcRenderer.on('opened-file', (event, filepath) => {
    // Open a file when the user picks one from the dialog
    let content = document.getElementById('content')
    content.innerHTML = `opening ${filepath}`
    fs.readFile(filepath.toString(), {}, (err, data) =>{ 
        // construct a base URL for the file
        let hd = new HardDocRenderer(baseUrl = path.dirname(filepath.toString()))
        content.innerHTML = "opened"
        if(err) throw err
        // put the contents of the file into the content div
        content.innerHTML = hd.renderString(data.toString())
    })
    content.innerHTML = "done"
})