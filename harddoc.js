/*
This class uses remarkable to render markdown-based hardware documentation

Released under LGPL v3 by Richard Bowman, 2018
*/
const marked = require('marked')


class HardDocRenderer{
    constructor(baseUrl='.', config={}){
        console.log(`got baseURL ${baseUrl}`)
        this.baseUrl=baseUrl;
        this.config=config;
        this.markedRenderer = new marked.Renderer()
        
        this.markedRenderer.link = (function(href, title, text){
            if(href.startsWith("http")){
                console.log(`got an http link ${href}`)
                return `<a class="external_link" href="${href}" title="${title}">${text}</a>`
            }else if(href.startsWith(".")){
                console.log(`got a different link ${href}`)
                return `<a class = "internal_link" href="${href}" title="${title}">(internal)${text}</a>`
            }else{
                return `<a class = "unknown_link" href="${href}" title="${title}">(internal)${text}</a>`
            }
        })
        let prefix = this.baseUrl
        console.log(`setting images to use base URL ${this.baseUrl}`)
        this.markedRenderer.image = (function(href, title, text){
            if(href.startsWith("http")){
                return `<img class="external_image" src="${href}" title="${title}" alt="${text}" />`
            }else if(href.startsWith(".")){
                return `<img class="local_image" src="${prefix}/${href}" title="${title}" alt="${text}" />`
            }else{
                return `<img class="unknown_image" src="${href}" title="${title}" alt="${text}" />`
            }
        })
    }
    renderString(data){
        // Render a string to HTML (returning the HTML as a string)
        return marked(data.toString(), {renderer: this.markedRenderer})
    }

}