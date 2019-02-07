import { MessageModel, MessagePageModel } from './models/message.model';
import { ListViewModel } from './list.view-model';
import { MessagesService } from './services/messages.service';
import { BlockModel } from './models';
import { BlockViewModel } from './block.view-model';

export class Controller {

    constructor(private vm: ListViewModel, private messageSerice: MessagesService) {
        this.init();
    }

    init() {
        // навешиваем события
        this.vm.renderComplete = () => {
            this.messageSerice.renderComplete();
        };
        this.vm.elementHover = (block: BlockViewModel) => {
            this.vm.highlightBlock(block);
            this.messageSerice.blockHover(block.model);
        };
        this.vm.elementClick = (block: BlockViewModel) => {
            this.messageSerice.selectBlock(block.model);
        };
    }

    messageReceived(message: MessageModel) {
        switch (message.type) {
            case 'addOrUpdate':
                this.vm.addOrUpdate(message);
                break;
            case 'settings':
                document.location.reload();
                break;
            case 'scrollTo':
                this.vm.scrollTo(message);
                break;
            case 'select':
                this.vm.selectBlock(message);
                break;
            case 'remove':
                this.vm.removeBlock(message);
                break;
            case 'clone':
                this.vm.cloneBlock(message);
                break;
            case 'page':
                this.vm.reloadPage(<MessagePageModel>message);
                break;
            case 'move':
                this.vm.moveBlock(message);
                break;
            default:
                console.log(message.type, message);
                break;
        }
    }

    // start drag
    // drag move
    // stop drag
}
