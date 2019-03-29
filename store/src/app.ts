import { EventsDispatcher } from './events.dispatcher';
import { BlockViewModel } from './block.view-model';

export class App {
    private list: BlockViewModel[] = [];

    constructor(private dispatcher: EventsDispatcher) { }

    run() {
        this.dispatcher.handleMessage =
            (handler, msg) => {
                handler.execute(msg, this.list);
            };
        this.dispatcher.run();
        this.reloadResources();
    }

    public getList(): BlockViewModel[] {
        return this.list;
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
}
