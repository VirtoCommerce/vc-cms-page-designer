export class BlockView {

    private element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
    }

    setHtml(html: string) {
        this.element.innerHTML = html;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    remove() {
        this.element.remove();
    }

    select() { }
}

// var html;

// function init(){
//     html = $("<input type='checkbox'/><label></label></li>");
// }

// var public = {
//     getHtml: function(){
//         return html;
//     },
//     setModel: function(model){
//         html.find("input").attr("id", model.getID());
//         html.find("label").attr("for", model.getID());
//         html.find("label").html(model.getText());
//     },
//     addCheckedHandler: function(handler){
//         html.find("input").click(handler);
//     },
//     remove: function(){
//         html.remove();
//     }
// }

// init();
// return public;