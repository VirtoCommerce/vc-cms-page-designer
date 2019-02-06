import { HttpService } from './services/http.service';
import { BlocksViewModelFactory } from './block-vm.factory';
import { MessagesService } from './services/messages.service';
import { App } from './app';
import { View } from './view';
import { Controller } from './controller';
import { ListViewModel } from './list.view-model';
import { Environment } from './environment';

document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.getElementById("designer-preview");
    const http = new HttpService(Environment.RenderBlockApiUrl);
    const messages = new MessagesService(Environment.DesignerUrl);

    const view = new View(targetElement);
    const blocksFactory = new BlocksViewModelFactory(http);
    const listViewModel = new ListViewModel(view, blocksFactory);
    const controller = new Controller(listViewModel, messages);
    const app = new App(controller);
    app.run();
});
