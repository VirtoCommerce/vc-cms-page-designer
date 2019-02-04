export interface MessageModel {
    type?: string;
    content?: {
        id?: number;
        source?: number;
        destination?: number;
        currentIndex?: number;
        newIndex?: number;
    };
}

export interface MessagePageModel {
    content: any[];
}
