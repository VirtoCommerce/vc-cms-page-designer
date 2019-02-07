import { BlockEventListener } from './block.event-listener';
import { MessageModel, MessagePageModel } from './models/message.model';
import { View } from './view';
import { BlockViewModel } from './block.view-model';
import { BlockModel } from './models';
import { BlocksViewModelFactory } from './block-vm.factory';

export class ListViewModel implements BlockEventListener {

    private blocks: BlockViewModel[] = [];
    private selectedBlock: BlockViewModel;
    private highlightedBlock: BlockViewModel;

    renderComplete = () => { };

    elementHover = (source: BlockViewModel) => { };
    elementClick = (source: BlockViewModel) => { };

    constructor(private view: View, private factory: BlocksViewModelFactory) { }

    // public

    addOrUpdate(message: MessageModel) {
        this.removeBlockById(null);
        if (!!message.content) {
            const key = this.asKey(message.content.id);
            const vm = this.getBlock(key) || this.createBlockViewModel(message.content);
            const index = this.setBlock(key, vm);
            vm.render(this.view, index, true);
        }
    }

    scrollTo(message: MessageModel) {
        // TODO:
    }

    highlightBlock(vm: BlockViewModel) {
        if (!!this.highlightedBlock) {
            this.highlightedBlock.unlight();
            this.highlightedBlock = null;
        }
        if (this.selectedBlock !== vm) {
            this.highlightedBlock = vm;
            vm.highlight();
        }
    }

    selectBlock(message: MessageModel) {
        const vm = this.getBlockById(message.content.id);
        vm.select();
        if (!!this.selectedBlock) {
            this.selectedBlock.deselect();
        }
        this.selectedBlock = vm;
    }

    removeBlock(message: MessageModel) {
        this.removeBlockById(message.content.id);
    }

    cloneBlock(message: MessageModel) {
        const block = this.getBlockById(message.content.source);
        const index = this.blocks.indexOf(block);
        const newBlock = this.createBlockViewModel(block.model);
        newBlock.fromHtml(block.html);
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

    // private

    private render() {
        const promises = this.blocks.map((x, index) => x.render(this.view, index));
        Promise.all(promises).then(() => this.raiseRenderComplete());
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
        const result = this.factory.getBlockViewModel(model);
        result.eventListener = this;
        return result;
    }
}
