export class DndInteractor {

    private isPressed: boolean;
    private pressedModel: any;

    constructor(private container: HTMLElement) {
        window.addEventListener('mousemove', ($event) => {
            if (this.isPressed) {
                // if !dragStarged
                this.startDrag($event);
            }

        });
    }

    mouseDown(vm: any) {
        this.isPressed = true;
        this.pressedModel = vm;
        // store mouse coords relative document
    }

    mouseUp() {
        this.releaseDrag();
    }

    private startDrag(event) {
        // depends on move, for instance mouse move by y-coord should be more 10px or mouse leave source element
        // replace target element with placeholder
        // hide select and hover
        // shrink blocks
    }

    private drag(event) {
        // get new coords
        // search element under mouse
        // if above a half of element change up (send message to designer)
        // if below a half of element change down (send message to designer)
    }

    private releaseDrag() {
        // if drag happens
        // replace placeholder with source element
        // restore height of other elements
        // 'select' should be occured automatically

        // reset mouse coords
        this.isPressed = false;
        this.pressedModel = null;
    }
}
