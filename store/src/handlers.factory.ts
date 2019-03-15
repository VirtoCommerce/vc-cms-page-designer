import * as handlers from "./handlers";

export class HandlersFactory {
    private static handlers: handlers.MessageHandler[] = [
        new handlers.AddHandler(),        
        new handlers.CloneHandler(),        
        new handlers.HideHandler(),        
        new handlers.HoverHandler(),        
        new handlers.PreviewHandler(),        
        new handlers.RemoveHandler(),        
        new handlers.SelectHandler(),        
        new handlers.ShowHandler(),        
        new handlers.SwapHandler(),        
        new handlers.UpdateHandler(),        
    ];

    get(key: string): handlers.MessageHandler {
        return HandlersFactory.handlers.find(x => x.key == key);
    }
}
