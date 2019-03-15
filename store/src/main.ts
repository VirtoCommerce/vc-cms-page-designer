import { BaseMessage } from './models/base.message';
import { EventsDispatcher } from "./events.dispatcher";
import { HandlersFactory } from "./handlers.factory";
import { MessageHandler } from "./handlers";
import { BlockViewModel } from './block.view-model';

document.addEventListener('DOMContentLoaded', () => {
    const factory = new HandlersFactory();
    const dispatcher = new EventsDispatcher(factory);
    const list: BlockViewModel[] = [];

    dispatcher.handleMessage = (handler: MessageHandler, msg: BaseMessage) => {
        handler.execute(msg, list)
    };

    dispatcher.run();
});
// handler производит манипуляции либо с list либо с соответствующей viewmodel
//      после этого надо вызывать рендерер
// открытые вопросы:
//      кто должен вызывать рендере?
//      не нравится что список находится в main, надо понять какой актёр ещё должен быть (view?)
