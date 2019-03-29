import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "./base.handler";

export class AddHandler extends BaseHandler {
    readonly key = 'add';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        this.clearPreview(list);
        list.push(vm);
        vm.selected = true;
        this.reloadBlock(vm.source).then(result => {
            vm.htmlString = result;
            this.renderer.add(vm);
            this.renderer.select(vm);
        });
    }
}
