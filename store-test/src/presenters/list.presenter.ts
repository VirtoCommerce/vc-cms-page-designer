import { ListView } from '../views/list.view';
import { IncomingMessageBus } from '../incoming-message.bus';
import { MessageContentModel } from '../model/message-content.model';
import { BlockPresenter } from './block.presenter';
import { BlockView } from '../views/block.view';
import { HttpService } from '../core/http.service';

export class ListPresenter {

    private list: BlockPresenter[];

    constructor(private view: ListView, private eventsSource: IncomingMessageBus, private http: HttpService) {
        // list is the singleton actually, so unsubscribe is unnecessary
        eventsSource.message.subscribe('add', (msg: any) => this.addBlock(msg));
    }

    private addBlock(message: MessageContentModel) {
        const model = { message };
        const block = new BlockPresenter(new BlockView(), this.eventsSource, this.http);
        block.setModel(model);
        // block.clone.subscribe()
        this.view.addBlock(block.getView());
    }
}

// function ListPresenter(_view){
 
//     var view;
//     var model;
 
//     function init(){
//         view = _view;
         
//         view.addCreateTaskHandler(function(taskTitle){
//             var model   = new TaskModel(taskTitle);
//             var task    = new TaskPresenter(new TaskView());
//             task.setModel(model);
             
//             view.addTask(task.getView());
//         });
         
//     }
 
//     var public = {
//         getView: function(){
//             return view;
//         }
//     }
 
//     init();
//     return public;
// }