import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class HoverHandler extends BaseHandler {
    readonly key = 'hover';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        this.deselectAll(list);
        const content = msg.content;
        if (!content.id) {
            this.renderer.hover();
        } else {
            super.execute(msg, list);
        }
    }

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        this.renderer.hover(vm);
    }
}
