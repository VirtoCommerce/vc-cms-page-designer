import { BaseMessage } from "../models/base.message";
import { BlockViewModel } from "../block.view-model";

export interface MessageHandler {
    readonly key: string;
    execute(msg: BaseMessage, list: BlockViewModel[]): void;
}