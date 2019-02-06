export interface MessageModel {
    type?: string;
    content?: any;
}

export interface MessagePageModel {
    content: any[];
}

interface tmpMOdel {
    id?: number;
    source?: number;
    destination?: number;
    currentIndex?: number;
    newIndex?: number;
}