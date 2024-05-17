import { defaultTitle } from "../../constants";
import { ExcelComponent } from "../../core/ExcelComponent";
import {$} from "../../core/dom"
import { ActiveRoute } from "../../core/router/ActiveRoute";
import { changeTitle } from "../../redux/actions";


export class Header extends ExcelComponent {
    static className = 'header'

    constructor ($root, options){
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    toHTML(){
        const title = this.store.getState().title || defaultTitle
        return `
        <div class="header__left">
        <div class="header__left__logo">
            <img class="header__left__logo__img" src="./favicon.svg" alt="logo">
        </div>
        <input class="header__left__input" value="${title}" type="text">
    </div>
    <div class="header__right">


        <button data-button="exit" class="header__right__btn">
            <i data-button="exit" class="material-icons">exit_to_app</i>
        </button>

        <button data-button="remove" class="header__right__btn">
            <i data-button="remove" class="material-icons">delete</i>
        </button>
    </div>`
    }

    onClick(event){
        // console.log(event.target.dataset.button);
        // // event.preventDefault()
        const $target = $(event.target)

        if($target.data.button === 'exit'){
            ActiveRoute.navigate('')
 
        } else if ($target.data.button === 'remove') {
            const decision = confirm("Ви дійсно хочете видалити таблицю?")
            if(decision){
                localStorage.removeItem('excel:'+ActiveRoute.param)
                ActiveRoute.navigate('')
            }  
        }
    }

    onInput(event){
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}