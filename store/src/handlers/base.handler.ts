import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { MessageHandler } from "./message.handler";

export abstract class BaseHandler implements MessageHandler {

    abstract readonly key: string;

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        this.executeInternal();
    }

    protected executeInternal() { }
}