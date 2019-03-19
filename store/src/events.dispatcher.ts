import { MessagesService } from './services/messages.service';
import { HandlersFactory } from "./handlers.factory";
import { MessageHandler } from "./handlers";
import { BaseMessage, BlockViewModel } from "./models";

export class EventsDispatcher {
    handleMessage: (handler: MessageHandler, msg: BaseMessage) => void = () => {};

    constructor(private factory: HandlersFactory, private messages: MessagesService) { }

    run() {
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.data) {
                this.handleEvent(event.data)
            }
        });
    }

    selectBlock(vm: BlockViewModel) {
        if (!!vm && vm.source) {
            this.handleEvent({ type: 'select', content: vm.source });
            this.messages.selectBlock(vm.source);
            vm.selected = false;
        } else {
            this.handleEvent({ type: 'select', content: { id: 0 } });
            this.messages.selectBlock(null);
            if (!!vm) {
                vm.selected = true;
            }
        }
    }

    highlightBlock(vm: BlockViewModel) {
        this.messages.blockHover(vm.source);
    }

    unlightBlock() {
        this.messages.blockHover({ id: 0 });
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
