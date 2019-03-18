import { MessageContent } from './models';

export class BlockViewModel {
    id: string;
    source: MessageContent;
    element: HTMLElement;
    htmlString: string;
    selected: boolean; // is this field really necessary?
    hidden: boolean;

    onClick: () => void = () => { };
    onHover: () => void = () => { };
}
