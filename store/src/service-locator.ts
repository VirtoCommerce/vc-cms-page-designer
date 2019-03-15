import { HttpService } from './services/http.service';
import { EventsDispatcher } from './events.dispatcher';
import { Renderer } from './renderer';
import { HandlersFactory } from './handlers.factory';
import { Environment } from './environment';
import { App } from './app';

export class ServiceLocator {

    private static _http;
    private static _renderer;
    private static _factory;
    private static _dispatcher;
    private static _controller;

    static createApp(): any {
        return new App(this.getDispatcher());
    }

    static getHttp(): HttpService {
        return this._http || (this._http = new HttpService(Environment.RenderBlockApiUrl));
    }

    static getRenderer(): Renderer {
        return this._renderer || (this._renderer = new Renderer(document.getElementById("designer-preview")));
    }

    static getFactory(): HandlersFactory {
        return this._factory || (this._factory = new HandlersFactory());
    }

    static getDispatcher(): EventsDispatcher {
        return this._dispatcher || (this._dispatcher = new EventsDispatcher(this.getFactory()));
    }
}