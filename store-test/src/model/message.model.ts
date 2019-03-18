import { MessageContentModel } from './message-content.model';

export interface MessageModel {
    type: string;
    content: MessageContentModel;
}
