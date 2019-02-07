export class View {

    private shadowContainer: HTMLElement;

    constructor(private container: HTMLElement) {
        console.log(container);
    }

    setElement(index: number, element: HTMLElement) {
        if (this.container.children.length > index) {
            const currentElement = this.container.children.item(index);
            if (currentElement != element) {
                currentElement.replaceWith(element);
            }
        } else {
            this.container.appendChild(element);
        }
    }
}