import { MessagesService } from './services/messages.service';
import { BlockModel } from './models';
import { Controller } from './controller';

export class App {

    constructor(private controller: Controller) { }

    run() {
        this.init();
        this.reloadResources();
        // this.ready();
    }

    private init() {
        window.addEventListener('message', (event: MessageEvent) => {
            var data = event.data;
            this.controller.messageReceived(data);
        });
    }

    private reloadResources() {
        var urlParams = new URLSearchParams(window.location.search);
        var prefix = urlParams.get('preview_mode');
        var suffix = "?preview_mode=" + prefix + "&v=" + (new Date().getTime());

        var nodes = document.getElementsByTagName("link");
        var head = document.getElementsByTagName("head").item(0);

        function generateLinkNode(url) {
            var result = document.createElement("link");
            result.setAttribute("rel", "stylesheet");
            result.setAttribute("type", "text/css");
            result.setAttribute("href", url);
            return result;
        }

        for (var i = 0; i < nodes.length; i++) {
            var styleSheet = nodes[i];
            if (styleSheet.href && styleSheet.href.startsWith(document.location.origin) && styleSheet.href.endsWith(".css")) {
                var url = styleSheet.href + suffix;
                var newlink = generateLinkNode(url);
                head.replaceChild(newlink, styleSheet);
            }
        }
    }

    // private syncView() {
    //     // sync container's children with blocks list
    //     this.blocks.forEach((block, index) => {
    //         const element = this.container.children.item(index);
    //         if (!element) {
    //             this.container.appendChild(block.element);
    //         } else if (element != block.element){
    //             this.container.replaceChild(block.element, element);
    //         }
    //     });
    // }



    // private reloadPage(data: MessagePageModel) {
    //     // data.content = [{}] - list of blocks
    //     this.blocks = [];
    //     data.content.filter(x => x.type !== 'settings').forEach(x => this.addBlock(<BlockModel>{
    //         id: x.id,
    //         source: x,
    //         html: '',
    //         element: null
    //     }));

    //     Promise.all(this.blocks.map(x => this.doRequest(x))).then(() => {
    //         this.syncView();
    //         window.parent.postMessage({ type: 'render-complete' }, this.DesignerUrl);
    //     })
    // }

    // private moveBlock(data: MessageModel) {
    //     const current = this.blocks[data.content.currentIndex];
    //     this.blocks.splice(data.content.currentIndex, 1);
    //     this.blocks.splice(data.content.newIndex, 0, current);
    //     this.scrollTo({ content: { id: current.id } });
    // }

    // private cloneBlock(data: MessageModel) {
    //     /* data = { type: "clone", content: { source: id, destination: id } } */
    //     const block = this.getBlock(data.content.source);
    //     const index = this.blocks.indexOf(block);
    //     const newBlock = {
    //         ...block,
    //         id: data.content.destination,
    //         element: this.createElement(block.html)
    //     };
    //     this.addBlock(newBlock, index + 1);
    //     this.selectBlock({ content: { id: data.content.destination } });
    // }

    // private addOrUpdate(data: MessageModel) {
    //     if (!!data.content) {
    //         const model = this.getBlock(data.content.id) || <BlockModel>{ id: data.content.id };
    //         model.source = data.content;
    //         this.addBlock(model);
    //         this.doRequest(model).then(() => {
    //             this.syncView();
    //             this.selectBlock(data);
    //         });
    //     }
    // }

    // private removeBlock(data: MessageModel) {
    //     const block = this.deleteBlock(data.content.id);
    //     block.element.remove();
    // }

    // private selectedBlock: BlockModel = null;
    // private selectBlock(data: MessageModel) {
    //     const block = this.getBlock(data.content.id);
    //     if (!!this.selectedBlock && this.selectedBlock != block) {
    //         this.selectedBlock.element.className = this.selectedBlock.element.className.split(' ').filter(c => c.trim() != 'active').join(' ');
    //         this.selectedBlock = null;
    //     }
    //     if (!!block && this.selectedBlock != block) {
    //         block.element.className += ' active';
    //         this.selectedBlock = block;
    //     }
    // }

    // private scrollTo(data: MessageModel) {
    //     const block = this.getBlock(data.content.id);
    //     // scroll to block.element
    // }

    // private createElement(html: string): HTMLElement {
    //     const div = document.createElement('div');
    //     div.innerHTML = html;
    //     const result = <HTMLElement>div.firstChild;
    //     return result;
    // }

    // private doRequest(model: BlockModel): Promise<BlockModel> {
    //     return this.http.post(model.source).then(html => {
    //         model.html = html;
    //         model.element = this.createElement(html);
    //         return model;
    //     })
    // }

    // todo: select
    // todo: dnd

    // private ready() {
    //     var urlParams = new URLSearchParams(window.location.search);
    //     var prefix = urlParams.get('preview_mode');
    //     var suffix = "?preview_mode=" + prefix + "&v=" + (new Date().getTime());

    //     var nodes = document.getElementsByTagName("link");
    //     var head = document.getElementsByTagName("head").item(0);

    //     function generateLinkNode(url) {
    //         var result = document.createElement("link");
    //         result.setAttribute("rel", "stylesheet");
    //         result.setAttribute("type", "text/css");
    //         result.setAttribute("href", url);
    //         return result;
    //     }

    //     for (var i = 0; i < nodes.length; i++) {
    //         var styleSheet = nodes[i];
    //         if (styleSheet.href && styleSheet.href.startsWith(document.location.origin) && styleSheet.href.endsWith(".css")) {
    //             var url = styleSheet.href + suffix;
    //             var newlink = generateLinkNode(url);
    //             head.replaceChild(newlink, styleSheet);
    //         }
    //     }
    // }

    // private addBlock(model: BlockModel, index: number = null) {
    //     const key = this.asKey(model.id);
    //     const current = this.getBlock(model.id);
    //     if (!!current) {
    //         const index = this.blocks.indexOf(current);
    //         this.blocks[index] = model;
    //     } else {
    //         if (index !== null) {
    //             this.blocks.splice(index, 0, model);
    //         } else {
    //             this.blocks.push(model);
    //         }

    //     }
    //     this.blocks[key] = model;
    // }

    // private getBlock(id: number): BlockModel {
    //     const key = this.asKey(id);
    //     return this.blocks[key];
    // }

    // private deleteBlock(id: number) : BlockModel{
    //     const key = this.asKey(id);
    //     const block = this.getBlock(id);
    //     delete this.blocks[key];
    //     const index = this.blocks.indexOf(block);
    //     this.blocks.splice(index, 1);
    //     return block;
    // }

    // private asKey(id: number): string {
    //     return `instanse${id}`;
    // }
}


