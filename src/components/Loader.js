import { $ } from "../core/dom";

export function Loader (){
    return $.create('div', 'preloaderbox').html(
        `<div class="preloader"></div>`
    )
}