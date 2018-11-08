/*
This class uses remarkable to render markdown-based hardware documentation

Released under LGPL v3 by Richard Bowman, 2018
*/

const Remarkable = require('remarkable')
const md = new Remarkable()


class HardDocRenderer{
    constructor(baseUrl='.', config={}){
        this.baseUrl=baseUrl;
        this.config=config;
    }
    renderString(data){
        // Render a string to HTML (returning the HTML as a string)
        return md.render(data.toString())
    }

}