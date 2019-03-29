import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SwapHandler extends BaseHandler {
    readonly key = 'swap';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        const vm = list[msg.content.currentIndex];
        list.splice(msg.content.currentIndex, 1);
        list.splice(msg.content.newIndex, 0, vm);
        if (list[msg.content.currentIndex].element.parentElement === list[msg.content.newIndex].element.parentElement) {
            vm.element.remove();
            this.renderer.insert(vm, msg.content.newIndex);
        }
    }
}