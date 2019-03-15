import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class HideHandler extends BaseHandler {
    readonly key = 'hide';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        vm.hidden = true;
        vm.element.style.display = 'none';
    }
}