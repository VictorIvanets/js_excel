import { Emitter } from '../../core/Emitter'
import {$} from '../../core/dom'
import {StoreSubscriber} from '../../core/StoreSubscriber'
import { updateDate } from '../../redux/actions'

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot(){
        const $root =  $.create('div', 'excel')

        const componentOption = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el =  $.create('div', Component.className)
            const component = new Component($el, componentOption)

            $el.html(component.toHTML())
            $root.append($el)
            return component
        });

        return $root

    }

    init(){
        if (process.env.NODE_ENV === 'production'){
            console.log(process.env.NODE_ENV);
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init());
    }
    destroy(){
        this.subscriber.unsubscribeFromStor()
        this.components.forEach(component => component.destroy());
    }
}