export interface BaseMessage {
    type: string;
    content: MessageContent;
}

export interface MessageContent {
    id?: number;

    // clone
    source?: number;
    destination?: number;

    // swap
    currentIndex?: number;
    newIndex?: number;

    // block
    hidden?: boolean;

    // page
    blocks?: MessageContent[];
}
