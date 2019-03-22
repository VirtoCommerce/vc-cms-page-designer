import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SelectHandler extends BaseHandler {
    readonly key = 'select';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        this.deselectAll(list);
        this.clearPreview(list);
        const content = msg.content;
        if (content.id === 0) {
            this.renderer.select();
        } else {
            super.execute(msg, list);
        }
    }

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        vm.selected = true;
        this.renderer.select(vm);
        this.renderer.scrollTo(vm);
    }
}