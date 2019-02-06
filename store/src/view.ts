export class View {
    constructor(private container: HTMLElement) { }

    setElement(index: number, element: HTMLElement) {
        console.log(1);
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