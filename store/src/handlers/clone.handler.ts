import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class CloneHandler extends BaseHandler {
    readonly key = 'clone';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        this.deselectAll(list);
        const source = this.getViewModel(msg.content.source, list);
        const clone: BlockViewModel = {
            id: this.generateId(msg.content.destination),
            source: {
                ...source.source,
                id: msg.content.destination
            },
            htmlString: source.htmlString,
            hidden: source.hidden,
            element: null,
            selected: true
        };

        const index = list.indexOf(source);
        list.splice(index + 1, 0, clone);
        this.renderer.insert(clone, index + 1);
        this.renderer.select(clone);
    }
}