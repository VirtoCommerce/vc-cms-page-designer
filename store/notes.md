# store side

This project is a script that receive messages from cms designer, process them and is responsible for correct work with preview of blocks.

Also this script send messages back to the CMS designer for highlight and select blocks when it is necessary.

## logic

`EventsDispatcher` class receives all messages events, requests particular handler from `HandlersFactory` and executes it,

Every `Handler` has a single entry point, where it receives a msg and list of blocks. It should manipulate data and then, if it's necessary, run correspond method of `Renderer` class.

The `Renderer` is responsible for HTML-output. It use `PreviewInteractor` to do operation with blocks.

`PreviewInteractor` creates hover and select elements, places over blocks or hides them. Also it can notify `EventsDispatcher` about events to send them to CMS desginer as messages.

## dnd logic
