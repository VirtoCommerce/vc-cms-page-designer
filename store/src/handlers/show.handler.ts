import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class ShowHandler extends BaseHandler {
    readonly key = 'show';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        vm.hidden = false;
        vm.element.style.display = 'block';
        this.renderer.scrollTo(vm);
    }
}