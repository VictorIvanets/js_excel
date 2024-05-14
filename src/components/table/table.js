import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.temp";
import {resizeHandler} from "./table.resize"
import { TableSelection } from "./tableselection";
import {$} from "../../core/dom"
import {matrix, isCell, shouldResize, nextSelector} from "./table.functions"
import * as actions from '../../redux/actions'
import {defaultStyles} from '../../constants'
import {parse} from "../../core/parse"
// import { ids } from "webpack";





export class Table extends ExcelComponent {
    static className = 'table'

    constructor ($root, options){
        super($root,{
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
        ...options
        })
    }

    prepare(){
        this.selection = new TableSelection()
    }


    init(){
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on("formula:input", value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            // this.selection.current.text(value)
            this.updateTextStore(value)
        })
        this.$on("formula:done", () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value =>{
            console.log(value);
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyles({
                value,
                ids: this.selection.selectedIds
            }))
        })
        // this.$subscribe(state=>{
        //     console.log("TableState", state);
        // })
    }

    selectCell($cell){
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const style = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(style))
    }

    
    toHTML(){
        return createTable(20, this.store.getState())}
    

    async resizeTable(event){
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
            
        } catch(e){
            console.warn(e.massage);
        }
       
    }

    onMousedown(event) {
    if (shouldResize(event)){
        this.resizeTable(event)}
        else if (isCell(event)){
            const $target = $(event.target)
            if (event.shiftKey || event.altKey){
                console.log(event);
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                    this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }      
    }


    onKeydown(event){
        const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Enter', 'Tab']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey){
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
        if (event.key === 'Delete'){
            event.target.textContent = ''
        }
        ////  del in state???
        
    }

    updateTextStore(value){
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))

    }
    onInput(event){
        this.updateTextStore($(event.target).text()) 
    }

    
}


