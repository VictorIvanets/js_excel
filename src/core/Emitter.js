export class Emitter {

    constructor(){
        this.listeners = {}
    }

    emit(event, ...args){
        if (!Array.isArray(this.listeners[event])){
            return false
        }
        this.listeners[event].forEach(listeners => {
            listeners(...args)
        })
        return true
    }





    subscribe(event, fn){
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return ()=>{
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
        }
    }


}

// const emitter = new Emitter()
// const unsab = emitter.subscribe("test", data => console.log(data))
// emitter.emit("test", 111)

// setTimeout(()=>{
//     emitter.emit("test", 222) 
//     unsab()
// },2000
// )

// setTimeout(()=>{
//     emitter.emit("test", 333) 
// },3000
// )