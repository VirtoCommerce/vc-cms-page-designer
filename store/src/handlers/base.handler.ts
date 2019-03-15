import { Renderer } from './../renderer';
import { BaseMessage, MessageContent } from "../models";
import { BlockViewModel } from "../block.view-model";
import { MessageHandler } from "./message.handler";
import { ServiceLocator } from '../service-locator';

export abstract class BaseHandler implements MessageHandler {

    abstract readonly key: string;
    protected get renderer(): Renderer {
        // TODO: renderer must be in App!!
        return ServiceLocator.getRenderer();
    }

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        let vm = this.getViewModel(msg.content.id, list);
        if (!vm) {
            vm = this.createViewModel(msg.content);
        }
        this.executeInternal(msg, list, vm);
    }

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) { }

    protected reloadBlock(model: any): Promise<string> {
        return ServiceLocator.getHttp().post(model);
    }

    protected generateId(id: number) {
        if (id) {
            return `instance${id}`;
        }
        return 'preview-instance';
    }

    protected createViewModel(content: MessageContent): BlockViewModel {
        return {
            id: this.generateId(content.id),
            source: content,
            element: null,
            htmlString: null,
            selected: false,
            hidden: false
        };
    }

    protected getViewModel(id: number, list: BlockViewModel[]): BlockViewModel {
        const internalId = this.generateId(id);
        return list.find(x => x.id === internalId);
    }

    protected deselectAll(list: BlockViewModel[]) {
        list.forEach(x => x.selected = false);
    }

    protected clearPreview(list: BlockViewModel[]) {
        const previewId = this.generateId(null);
        const listToRemove = list.filter(x => x.id === previewId).map((item, index) => <any>{ item, index });
        listToRemove.forEach(x => {
            list.splice(x.index, 1);
            x.item.element.remove();
        });
    }
}