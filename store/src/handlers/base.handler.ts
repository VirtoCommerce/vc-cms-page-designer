import { Renderer } from './../renderer';
import { BaseMessage, MessageContent } from "../models";
import { BlockViewModel } from "../block.view-model";
import { MessageHandler } from "./message.handler";
import { ServiceLocator } from '../service-locator';

export abstract class BaseHandler implements MessageHandler {

    abstract readonly key: string;
    protected get renderer(): Renderer {
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

    protected createViewModel(content: MessageContent, isPreview = false): BlockViewModel {
        const result = new BlockViewModel();
        Object.assign(result, {
            id: this.generateId(content.id),
            source: content,
            element: null,
            isPreview: isPreview,
            htmlString: null,
            selected: false,
            hidden: !!content.hidden
        });
        return result;
    }

    protected getViewModel(id: number, list: BlockViewModel[]): BlockViewModel {
        const internalId = this.generateId(id);
        return list.find(x => x.id === internalId);
    }

    protected deselectAll(list: BlockViewModel[]) {
        list.forEach(x => x.selected = false);
    }

    protected clearPreview(list: BlockViewModel[]) {
        const listToRemove = list.map((item, index) => <any>{ item, index }).filter(x => x.item.isPreview);
        listToRemove.forEach(x => {
            list.splice(x.index, 1);
            x.item.element.remove();
        });
    }
}