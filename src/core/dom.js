class Dom {
    constructor(selector){
        this.$el = typeof selector === 'string' 
        ? document.querySelector(selector)
        : selector
    }
    
    html(html){
        if(typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        } 
        return this.$el.outerHTML.trim()
    }

    text(text){
        if(typeof text !== 'undefined'){
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input'){
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear(){
        this.html('')
        return this
    }

    append(node){
        if (node instanceof Dom){
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    get data(){
        return this.$el.dataset
    }

    closest(selector){
        return $(this.$el.closest(selector))
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }

    off (eventType, callBack) {
        this.$el.removeEventListener(eventType, callBack)
    }

    on (eventType, callBack) {
        this.$el.addEventListener(eventType, callBack)
    }

    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }
    find(selector){
        return  $(this.$el.querySelector(selector))
    }

    css(styles = {}){
        Object.keys(styles).forEach(key=>{
            this.$el.style[key] = styles[key]
        })
    }

    getStyles(styles=[]){
        return styles.reduce((res, s)=>{
            res[s] = this.$el.style[s]
            return res
        },{})
    }

    addClass(classN){
        this.$el.classList.add(classN)
        return this
    }

    removeClass(classN){
        this.$el.classList.remove(classN)
        return this
    }

    id(parse){
        if(parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus(){
        this.$el.focus()
        return this
    }

    attr(name, value){
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.setAttribute(name)
    }
}


export function $(selector) {
    return new Dom(selector)
}

$.create = (tadName, classes = "") =>{
    const el = document.createElement(tadName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}