import { Page } from "../core/Page";
import { $ } from "../core/dom";
import {createRecordsTable} from "./dashboard.functions"

export class DashboardPage extends Page {
    getRoot(){
        const now = Date.now().toString()
        return $.create('div', 'db').html(

        `
        <div class="db__header">
            <div class="header__left__logo">
                <img class="header__left__logo__img" src="./favicon.svg" alt="logo">
            </div>
                <h1 class="db__header_h1">EXCEL</h1>
        </div>

        <div class="db__new">
            <a class="db__create" href="#excel/${now}">NEW <br> TABLE</a>
        </div>


        <div class="db__table">

                ${createRecordsTable()}

        </div>`

        )
    }
}