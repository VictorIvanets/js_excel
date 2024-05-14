import { Excel } from './components/excel/excel'
import './sass/index.sass'
import {Header} from './components/header/header'
import {Toolbar} from './components/toolbar/toolbar'
import {Formula} from './components/formula/formula'
import {Table} from './components/table/table'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'


const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    storage('excel-state', state)}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
