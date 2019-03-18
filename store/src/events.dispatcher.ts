import { HandlersFactory } from "./handlers.factory";
import { MessageHandler } from "./handlers";
import { BaseMessage, BlockViewModel } from "./models";

export class EventsDispatcher {
    handleMessage: (handler: MessageHandler, msg: BaseMessage) => void = () => {};

    constructor(private factory: HandlersFactory) { }

    run() {
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.data) {
                this.handleEvent(event.data)
            }
        });
    }

    selectBlock(vm: BlockViewModel) {

    }

    highlightBlock(vm: BlockViewModel) {

    }

    swapBlock() {

    }

    private handleEvent(msg: BaseMessage) {
        const handler = this.factory.get(msg.type);
        if (handler) {
            this.handleMessage(handler, msg);
        }
    }
}
