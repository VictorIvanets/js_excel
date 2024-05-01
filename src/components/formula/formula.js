import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = 'formula'

    constructor ($root){
        super($root,{
            name: 'Formula',
            listeners: ['input', 'click']

        })
    }



    toHTML(){
    
        return `
        <div class="formula__info"><h2 class="formula__info__h1">fx</h2></div>
        <div class="formula__inputbox"><div class="formula__inputbox__input" contenteditable="" spellcheck="false">FORMULA</div></div>

        `
    }


    onInput(event){
        console.log('formula input', event.target.textContent.trim());

    }

    onClick() {
        console.log("Formula click");
    }

}