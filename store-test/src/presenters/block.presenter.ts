import { BlockView } from '../views/block.view';
import { BlockModel } from '../model/block.model';
import { IncomingMessageBus } from '../incoming-message.bus';
import { HttpService } from '../core/http.service';
import { EventEmitter } from '../core/event.eitter';

export class BlockPresenter {

    private model: BlockModel;
    private subscriptions: (() => void)[];

    remove = new EventEmitter();


    constructor(private view: BlockView, eventsSource: IncomingMessageBus, private http: HttpService) {
        this.subscriptions = [
            eventsSource.message.subscribe('update', msg => this.update(msg)),
            eventsSource.message.subscribe('remove', msg => this.removeBlock(msg)),
            eventsSource.message.subscribe('select', msg => this.select(msg)),
            eventsSource.message.subscribe('clone', msg => this.clone(msg))
            // hide
            // hover
            // preview
            // show
            // swap

            // page
            // reload
        ]
    }

    setModel(model: BlockModel) {
        this.model = model;
        this.reload();
    }

    getView(): BlockView {
        return this.view;
    }

    private clone(message) {
        if (message.id === this.model.message.id) {
            
        }
    }

    private update(message) {
        if (message.id === this.model.message.id) {
            this.setModel({ message });
        }
    }

    private select(msg) {
        if (msg.id === this.model.message.id) {
            this.view.select();
        }
    }

    private removeBlock(msg) {
        if (msg.id === this.model.message.id) {
            this.view.remove();
            this.remove.emit(this);
            this.destroy();
        }
    }

    private reload() {
        this.http.post(this.model.message).then(result => {
            this.view.setHtml(result);
        });
    }

    private destroy() {
        this.subscriptions.forEach(unsubscr => unsubscr());
    }

}
// var view;
//     var model;

//     function init(){
//         view = _view;
//         view.addCheckedHandler(function(){
//             view.remove();
//         });
//     }

//     var public = {
//         getView: function(){
//             return view;
//         },
//         setModel: function(_model){
//             model = _model;
//             view.setModel(model);
//         }
//     }

//     init();
//     return public;