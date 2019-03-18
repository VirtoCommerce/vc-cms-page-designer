export interface MessageContentModel {
    id?: number;

    // clone
    source?: number;
    destination?: number;

    // swap
    currentIndex?: number;
    newIndex?: number;

    // page
    blocks?: MessageContentModel[];
}
