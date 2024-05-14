import { defaultTitle } from "../../constants";
import { ExcelComponent } from "../../core/ExcelComponent";
import {$} from "../../core/dom"
import { changeTitle } from "../../redux/actions";


export class Header extends ExcelComponent {
    static className = 'header'

    constructor ($root, options){
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
        <button class="header__right__btn">
            <i class="material-icons">exit_to_app</i>
        </button>
        <button class="header__right__btn">
            <i class="material-icons">delete</i>
        </button>
    </div>`
    }

    onInput(event){
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

}