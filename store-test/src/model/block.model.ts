import { MessageContentModel } from './message-content.model';

export interface BlockModel {
    id?: string;
    message: MessageContentModel;
}
