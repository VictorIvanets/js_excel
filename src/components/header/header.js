import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'header'

    constructor ($root, options){
        super($root, {
            name: 'Header',
            ...options
        })
    }


    toHTML(){
        return `
        <div class="header__left">
        <div class="header__left__logo">
            <img class="header__left__logo__img" src="./favicon.svg" alt="logo">
        </div>
        <input class="header__left__input" placeholder="NEW TABLE!" type="text">
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

}