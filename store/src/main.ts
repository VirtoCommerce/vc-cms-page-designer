import { HttpService } from './services/http.service';
import { MessagesService } from './services/messages.service';
import { App } from './app';
import { View } from './view';
import { ListController } from './list.controller';
import { Environment } from './environment';

document.addEventListener("DOMContentLoaded", () => {
    const targetElement = document.getElementById("designer-preview");
    const http = new HttpService(Environment.RenderBlockApiUrl);
    const messages = new MessagesService(Environment.DesignerUrl);

    const view = new View(targetElement);
    const listController = new ListController(view, http, messages);
    const app = new App(listController);
    app.run();
});
