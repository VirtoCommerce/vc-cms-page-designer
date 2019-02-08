import { BlockEventListener } from './block.event-listener';
import { MessageModel, MessagePageModel } from './models/message.model';
import { View } from './view';
import { BlockViewModel } from './block.view-model';
import { BlockModel } from './models';
import { HttpService } from './services/http.service';
import { MessagesService } from './services/messages.service';

export class ListController implements BlockEventListener {

    private blocks: BlockViewModel[] = [];
    private selectedBlock: BlockViewModel;
    private highlightedBlock: BlockViewModel;

    constructor(private view: View, private http: HttpService, private messageSerice: MessagesService) {
        view.eventListener = this;
    }

    // #region events

    private renderComplete() {
        this.messageSerice.renderComplete();
    };

    messageReceived(message: MessageModel) {
        switch (message.type) {
            case 'addOrUpdate':
                this.addOrUpdate(message);
                break;
            case 'settings':
                document.location.reload();
                break;
            case 'scrollTo':
                this.scrollTo(message);
                break;
            case 'select':
                this.selectBlock(message);
                break;
            case 'remove':
                this.removeBlock(message);
                break;
            case 'clone':
                this.cloneBlock(message);
                break;
            case 'page':
                this.reloadPage(<MessagePageModel>message);
                break;
            case 'move':
                this.moveBlock(message);
                break;
            default:
                console.log(message.type, message);
                break;
        }
    }

    elementHover(source: BlockViewModel) {
        if (!!this.highlightedBlock) {
            this.view.unlight();
            this.highlightedBlock = null;
        }
        if (this.selectedBlock !== source && !!source) {
            this.highlightedBlock = source;
            this.view.highlight(source);
        }
        this.messageSerice.blockHover(source.model);

    };

    elementClick() {
        const vm = (!this.selectedBlock || this.selectedBlock !== this.highlightedBlock) ? this.highlightedBlock : null;
        this.selectedBlock = vm;
        this.messageSerice.selectBlock(vm ? vm.model: null);
    };

    // #endregion

    // #region public

    addOrUpdate(message: MessageModel) {
        this.removeBlockById(null);
        if (!!message.content) {
            const key = this.asKey(message.content.id);
            const vm = this.getBlock(key) || this.createBlockViewModel(message.content);
            vm.model = message.content;
            const index = this.setBlock(key, vm);
            this.generateElement(vm, true).then(x => {
                this.view.setElement(index, vm);
            });
        }
    }

    /** */
    scrollTo(message: MessageModel) {
        const vm = this.getBlockById(message.content.id);
        this.view.scrollTo(vm);
    }

    /** */
    selectBlock(message: MessageModel) {
        if (!!this.selectedBlock) {
            this.view.deselect();
        }
        const vm = this.getBlockById(message.content.id);
        if (vm) {
            this.view.select(vm);
        }
        this.selectedBlock = vm;
    }

    removeBlock(message: MessageModel) {
        this.removeBlockById(message.content.id);
    }

    cloneBlock(message: MessageModel) {
        const block = this.getBlockById(message.content.source);
        const index = this.blocks.indexOf(block);
        const newBlock = this.createBlockViewModel({...block.model});
        newBlock.model.id = message.content.destination;
        newBlock.fromHtml(block.html);
        this.view.insertElement(index, newBlock);
        this.addBlock(newBlock, index + 1);
        this.selectBlock({ content: { id: message.content.destination } });
    }

    reloadPage(message: MessagePageModel) {
        this.blocks = [];
        message.content.filter(x => x.type !== 'settings').forEach(x => this.addBlock(this.createBlockViewModel(x)));
        this.render();
    }

    moveBlock(message: MessageModel) {
        const current = this.blocks[message.content.currentIndex];
        this.blocks.splice(message.content.currentIndex, 1);
        this.blocks.splice(message.content.newIndex, 0, current);
        this.scrollTo({ content: { id: current.model.id } });
    }

    // #endregion

    // #region private

    private render() {
        const promises = this.blocks.map((x) => this.generateElement(x));
        Promise.all(promises).then(() => {
            this.view.setList(this.blocks);
            this.raiseRenderComplete();
        });
    }

    private generateElement(vm: BlockViewModel, force: boolean = false): Promise<BlockViewModel> {
        if (force || !vm.element) {
            return this.http.post(vm.model).then(html => {
                vm.fromHtml(html);
                return vm;
            });
        }
        return Promise.resolve(vm);
    }

    private raiseRenderComplete() {
        this.renderComplete();
    }

    private removeBlockById(id: number) {
        const key = this.asKey(id);
        const vm = this.getBlock(key);
        if (!!vm) {
            const index = this.blocks.indexOf(vm);
            if (this.selectedBlock == vm) {
                this.selectedBlock = null;
            }
            vm.remove();
            this.blocks.splice(index, 1);
            delete this.blocks[key];
        }
    }

    private addBlock(block: BlockViewModel, index: number = null) {
        if (index === null) {
            this.blocks.push(block);
        } else {
            this.blocks.splice(index, 0, block);
        }
        this.setBlockById(block.model.id, block);
    }

    private setBlock(key: string, vm: BlockViewModel): number {
        let index = this.blocks.indexOf(vm);
        if (index === -1) {
            index = this.blocks.length;
            this.blocks.push(vm);
        }
        this.blocks[key] = vm;
        return index;
    }

    private setBlockById(id: number, vm: BlockViewModel) {
        const key = this.asKey(id);
        this.setBlock(key, vm);
    }

    private getBlock(key: string): BlockViewModel {
        return this.blocks[key];
    }

    private getBlockById(id: number): BlockViewModel {
        const key = this.asKey(id);
        return this.getBlock(key);
    }

    private asKey(id: number): string {
        if (!!id || id == 0)
            return `instanse${id}`;
        return 'preview-instance';
    }

    private createBlockViewModel(model: BlockModel) {
        const result = new BlockViewModel(model);
        result.eventListener = this;
        return result;
    }

    // #endregion
}
