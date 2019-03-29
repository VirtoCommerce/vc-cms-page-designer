import { DndInteractor } from './dnd.interactor';
import { PreviewInteractor } from './preview.interactor';
import { EventsBus } from './root/events.bus';
import { HttpService } from './services/http.service';
import { EventsDispatcher } from './events.dispatcher';
import { Renderer } from './renderer';
import { HandlersFactory } from './handlers.factory';
import { Environment } from './environment';
import { App } from './app';
import { MessagesService } from './services/messages.service';

export class ServiceLocator {

    private static _app;
    private static _container;
    private static _http;
    private static _messages;
    private static _renderer;
    private static _factory;
    private static _dispatcher;
    private static _eventBus;
    private static _interactor;
    private static _dnd;

    static createApp(): App {
        this._container = document.getElementById("designer-preview");
        return this._app || (this._app = new App(this.getDispatcher()));
    }

    static getPreviewInteractor(): PreviewInteractor {
        if (!this._interactor) {
            this._interactor = new PreviewInteractor(this.getDndInteractor());
        }
        return this._interactor;
    }

    static getDndInteractor(): DndInteractor {
        return this._dnd || (this._dnd = new DndInteractor(this._container, () => this._app.getList()));
    }

    static getEventBus(): EventsBus {
        return this._eventBus || (this._eventBus = new EventsBus());
    }

    static getHttp(): HttpService {
        return this._http || (this._http = new HttpService(Environment.RenderBlockApiUrl));
    }

    static getMessages(): MessagesService {
        return this._messages || (this._messages = new MessagesService(Environment.DesignerUrl));
    }

    static getRenderer(): Renderer {
        return this._renderer || (this._renderer = new Renderer(this._container));
    }

    static getFactory(): HandlersFactory {
        return this._factory || (this._factory = new HandlersFactory());
    }

    static getDispatcher(): EventsDispatcher {
        return this._dispatcher || (this._dispatcher = new EventsDispatcher(this.getFactory(), this.getMessages()));
    }
}