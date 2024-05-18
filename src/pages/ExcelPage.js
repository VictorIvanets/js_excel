import { Page } from "../core/Page";
import { Excel } from '../components/excel/excel'
import {Header} from '../components/header/header'
import {Toolbar} from '../components/toolbar/toolbar'
import {Formula} from '../components/formula/formula'
import {Table} from '../components/table/table'
import { createStore } from '../core//store/createStore'
import { rootReducer } from '../redux/rootReducer'
import {normalizeInitialState} from '../redux/initialState'
import { StateProcessor, LocalStorageClient2, LocalStorageClient} from "./Client";




export class ExcelPage extends Page{
    constructor(param){
        super(param)
        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient2(this.params) || new LocalStorageClient(this.params)
        )
    }

    async getRoot(){

        const state = await this.processor.get()
        const store = createStore(rootReducer, normalizeInitialState(state))
        this.storeSub = store.subscribe(this.processor.listen)
        
        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

         return this.excel.getRoot()
    }

    afterRender(){
        this.excel.init()
    }

    destroy(){
        this.excel.destroy()
        this.storeSub.unsubscribe()
    }



}