import * as handlers from "./handlers";

export class HandlersFactory {
    private static handlers: handlers.MessageHandler[] = [
        new handlers.AddHandler(),
        new handlers.UpdateHandler(),
        new handlers.CloneHandler(),
        new handlers.HideHandler(),
        new handlers.ShowHandler(),
        new handlers.RemoveHandler(),
        new handlers.PreviewHandler(),
        new handlers.SelectHandler(),
        new handlers.SwapHandler(),
        new handlers.ReloadHandler(),
        new handlers.PageHandler(),
        new handlers.HoverHandler(),
        new handlers.ResetHandler()
    ];

    get(key: string): handlers.MessageHandler {
        return HandlersFactory.handlers.find(x => x.key == key);
    }
}
