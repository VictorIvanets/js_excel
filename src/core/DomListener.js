import {capitalize} from '../core/utils'
export class DomListener {
constructor($root, listeners = []){
    if(!$root) {
        throw new Error("NO root in DomListener")
        }
    this.$root = $root
    this.listeners = listeners
    }

    initDomListener(){
    this.listeners.forEach(listeners => {
        const method = getMethodName(listeners)
        if (!this[method]){
            throw new Error(`No method ${method} in ${this.name || ''} Component`)
            }
        this[method] = this[method].bind(this)
        this.$root.on(listeners, this[method])
    })
    }

    removeDomListener(){
        this.listeners.forEach(listeners => {
            const method = getMethodName(listeners)
            this.$root.off(listeners, this[method])
        })
    }

}

function getMethodName(eventName) {
    return ('on' + capitalize(eventName))
} 