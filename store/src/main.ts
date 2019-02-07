import { HttpService } from './services/http.service';
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
    const listViewModel = new ListViewModel(view, http);
    const controller = new Controller(listViewModel, messages);
    const app = new App(controller);
    app.run();
});
