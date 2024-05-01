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

off (eventType, callBack) {
    this.$el.removeEventListener(eventType, callBack)
}

on (eventType, callBack) {
    this.$el.addEventListener(eventType, callBack)
}


}

export function $ (selector) {
    return new Dom(selector)
}

$.create = (tadName, classes = "") =>{
    const el = document.createElement(tadName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}