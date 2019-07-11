import { Environment } from './../environment';
import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "./base.handler";

export class ResetHandler extends BaseHandler {
    readonly key = 'reset';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        ServiceLocator.getHttp().postTo(Environment.ResetCacheApiUrl, {});
    }
}
