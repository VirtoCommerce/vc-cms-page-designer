import { ServiceLocator } from './service-locator';
import { EventsDispatcher } from './events.dispatcher';
import { MessageContent } from './models';

export class BlockViewModel {
    id: string;
    source: MessageContent;
    element: HTMLElement;
    htmlString: string;
    selected: boolean; // is this field really necessary?
    hidden: boolean;
    isPreview: boolean;

    onSelect: () => void = () => {
        this.eventsDispatcher.selectBlock(this);
    };
    onLeave: () => void = () => {
        this.eventsDispatcher.unlightBlock();
    };
    onHover: () => void = () => {
        this.eventsDispatcher.highlightBlock(this);
    };

    private get eventsDispatcher(): EventsDispatcher {
        return ServiceLocator.getDispatcher();
    }
}
