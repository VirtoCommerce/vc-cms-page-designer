import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class ReloadHandler extends BaseHandler {
    readonly key = 'reload';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        document.location.reload();
    }
}