import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.temp";
import {resizeHandler} from "./table.resize"
import {shouldResize} from "./table.functions"


export class Table extends ExcelComponent {
    static className = 'table'

    constructor ($root){
        super($root,{
            name: 'Table',
            listeners: ['mousedown'
            // , 'mouseup', 'mousemove'
        ]

        })
    }




    toHTML(){
        return createTable(20)}
    

    onMousedown(event) {
    if (shouldResize(event)){
        resizeHandler(this.$root, event)}}



}









//             listeners: ['mousedown', 'mouseup', 'mousemove']



//     mouseEvent = false

//     toHTML(){
//         return createTable(20)
//     }
    
//     onClick() {
//         // console.log(e);
//         // console.log(e.target);
//         // console.log(`"Table click"`);
//     }

//     onMousedown(e) {
//         this.mouseEvent = true
//         console.log(e.target);
//     }

//     onMouseup() {
//         this.mouseEvent = false
//     }

//     onMousemove(e) {

//         if (this.mouseEvent){
//             console.log(e.screenX)
//         }
        
//         // console.log("Table mousemove");
//     }
