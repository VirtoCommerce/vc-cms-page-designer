import { MessageContent } from './models';

export interface BlockViewModel {
    id: string;
    source: MessageContent;
    element: HTMLElement; // TODO: it should be in render logic
    htmlString: string;
    selected: boolean;
    hidden: boolean;
}
