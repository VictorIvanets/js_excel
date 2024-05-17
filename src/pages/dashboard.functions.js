import { storage } from "../core/utils"

function toHTML(key){
    const model = storage(key)
    const id = key.split(":")[1]

    // const dataopen = `${new Date().getMonth()} / 
    // ${new Date().getDay()}  |
    // ${new Date().getHours()} :  
    // ${new Date().getMinutes()} :
    // ${new Date().getSeconds()}`

    return `
    <li class="db__table__list__record">
    <a class="db__table__list__record_a" href="#excel/${id}">${model.title}</a> <strong>
    ${new Date(model.openDate).toLocaleDateString()} - 
    ${new Date(model.openDate).toLocaleTimeString()}
    </strong>
    </li>`
}

function getAllKeys(){
    const keys = []
    for (let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i)
        if(!key.includes('excel')){
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable(){
    const keys = getAllKeys()
    if (!keys.length){
        return `<h3 class="tacenter"> ще немає записів</h3>` 
    }
        return `                
            <div class="db__table__header">
            <span>Name:</span>
            <span>Open date:</span>
            </div>

            <ul class="db__table__list">
                ${keys.map(toHTML).join('')}
            </ul>`


}
