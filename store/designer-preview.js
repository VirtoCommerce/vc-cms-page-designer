class DesignerPreview {
    constructor() {
        this.RenderBlockApiUrl = '/designer-preview/block';
        this.DesignerUrl = 'http://localhost:4200/';
        this.blocks = [];
        this.handlers = {};
        this.selectedBlock = null;
    }
    run(container) {
        this.container = container;
        this.init();
        this.ready();
    }
    init() {
        window.addEventListener('message', (event) => {
            var data = event.data;
            this.dispatchEvent(data);
        });
        this.handlers['addOrUpdate'] = x => this.addOrUpdate(x);
        this.handlers['settings'] = x => this.reloadDocument(x);
        this.handlers['scrollTo'] = x => this.scrollTo(x);
        this.handlers['select'] = x => this.selectBlock(x);
        this.handlers['remove'] = x => this.removeBlock(x);
        this.handlers['clone'] = x => this.cloneBlock(x);
        this.handlers['page'] = x => this.reloadPage(x);
        this.handlers['move'] = x => this.moveBlock(x);
    }
    dispatchEvent(data) {
        const handler = this.handlers[data.type];
        if (handler !== null) {
            handler(data);
        }
        else {
            console.log(data.type, data);
        }
    }
    syncView() {
        // sync container's children with blocks list
        this.blocks.forEach((block, index) => {
            const element = this.container.children.item(index);
            if (!element) {
                this.container.appendChild(block.element);
            }
            else if (element != block.element) {
                this.container.replaceChild(block.element, element);
            }
        });
    }
    reloadDocument(data) {
        document.location.reload();
    }
    reloadPage(data) {
        // data.content = [{}] - list of blocks
        this.blocks = [];
        data.content.filter(x => x.type !== 'settings').forEach(x => this.addBlock({
            id: x.id,
            source: x,
            html: '',
            element: null
        }));
        Promise.all(this.blocks.map(x => this.doRequest(x))).then(() => {
            this.syncView();
            window.parent.postMessage({ type: 'render-complete' }, this.DesignerUrl);
        });
    }
    moveBlock(data) {
        const current = this.blocks[data.content.currentIndex];
        this.blocks.splice(data.content.currentIndex, 1);
        this.blocks.splice(data.content.newIndex, 0, current);
        this.scrollTo({ content: { id: current.id } });
    }
    cloneBlock(data) {
        /* data = { type: "clone", content: { source: id, destination: id } } */
        const block = this.getBlock(data.content.source);
        const index = this.blocks.indexOf(block);
        const newBlock = Object.assign({}, block, { id: data.content.destination, element: this.createElement(block.html) });
        this.addBlock(newBlock, index + 1);
        this.selectBlock({ content: { id: data.content.destination } });
    }
    addOrUpdate(data) {
        if (!!data.content) {
            const model = this.getBlock(data.content.id) || { id: data.content.id };
            model.source = data.content;
            this.addBlock(model);
            this.doRequest(model).then(() => {
                this.syncView();
                this.selectBlock(data);
            });
        }
    }
    removeBlock(data) {
        const block = this.deleteBlock(data.content.id);
        block.element.remove();
    }
    selectBlock(data) {
        const block = this.getBlock(data.content.id);
        if (!!this.selectedBlock && this.selectedBlock != block) {
            this.selectedBlock.element.className = this.selectedBlock.element.className.split(' ').filter(c => c.trim() != 'active').join(' ');
            this.selectedBlock = null;
        }
        if (!!block && this.selectedBlock != block) {
            block.element.className += ' active';
            this.selectedBlock = block;
        }
    }
    scrollTo(data) {
        const block = this.getBlock(data.content.id);
        // scroll to block.element
    }
    createElement(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        const result = div.firstChild;
        result.onmouse
        return result;
    }
    doRequest(model) {
        // https://gist.github.com/codecorsair/e14ec90cee91fa8f56054afaa0a39f13
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('post', this.RenderBlockApiUrl);
            xhr.setRequestHeader('Accept', 'application/json, text/javascript, text/plain');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(model.source));
            // xhr.timeout = timeout;
            xhr.onload = evt => {
                // const result = {
                //     ok: xhr.status >= 200 && xhr.status < 300,
                //     status: xhr.status,
                //     statusText: xhr.statusText,
                //     headers: xhr.getAllResponseHeaders(),
                //     data: xhr.responseText
                // };
                model.html = xhr.responseText.trim();
                model.element = this.createElement(model.html);
                resolve(model);
                // this.blocks.push(model); or replace
            };
            // xhr.onerror = evt => {
            //   resolve(errorResponse(xhr, 'Failed to make request.'));
            // };
            // xhr.ontimeout = evt => {
            //   resolve(errorResponse(xhr, 'Request took longer than expected.'));
            // };
        });
    }
    // todo: select
    // todo: dnd
    ready() {
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
    addBlock(model, index = null) {
        const key = this.asKey(model.id);
        const current = this.getBlock(model.id);
        if (!!current) {
            const index = this.blocks.indexOf(current);
            this.blocks[index] = model;
        }
        else {
            if (index !== null) {
                this.blocks.splice(index, 0, model);
            }
            else {
                this.blocks.push(model);
            }
        }
        this.blocks[key] = model;
    }
    getBlock(id) {
        const key = this.asKey(id);
        return this.blocks[key];
    }
    deleteBlock(id) {
        const key = this.asKey(id);
        const block = this.getBlock(id);
        delete this.blocks[key];
        const index = this.blocks.indexOf(block);
        this.blocks.splice(index, 1);
        return block;
    }
    asKey(id) {
        return `instanse${id}`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new DesignerPreview().run(document.getElementById("designer-preview"));
});
//# sourceMappingURL=designer-preview.js.map