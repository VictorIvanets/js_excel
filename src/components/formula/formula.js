import { ExcelComponent } from "../../core/ExcelComponent";
import {$} from "../../core/dom"

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor ($root, options){
        super($root,{
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }


    toHTML(){
    
        return `
        <div class="formula__info"><h2 class="formula__info__h1">fx</h2></div>
        <div class="formula__inputbox"><div id="formula" class="formula__inputbox__input" contenteditable="" spellcheck="false"></div></div>
        `
    }

    init(){
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell=>{
            this.$formula.text($cell.text())
        })
        this.$on('table:input', $cell=>{
            this.$formula.text($cell.text())
        })
    }


    onInput(event){

        this.$emit("formula:input", $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

       if (keys.includes(event.key)){
        event.preventDefault()
        this.$emit('formula:done')
       }
    }

}