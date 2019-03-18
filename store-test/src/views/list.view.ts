import { BlockView } from './block.view';

export class ListView {
    constructor() { }

    addBlock(block: BlockView) {
        const element = block.getElement();
    }
}

// var html;
 
// function init(){
//     html = $("<div>"+
//             "<h1>Awesome MVP task list</h1>"+
//                 "<fieldset><legend>Don't forget!</legend>"+
//                     "<ul id='tasklist'></ul>"+
//                 "</fieldset>"+
//             "<h2>Add a new task:</h2>"+
//             "What do you need to do? <input id='taskinput' placeholder='I need to do…'/> <input id='submittask' type='submit' value='Add'/>"+
//             "</div>");
// }

// var public = {
//     getHtml: function(){
//         return html;
//     },
//     addCreateTaskHandler: function(handler){
//         html.find("#submittask").click(function(){
//             var newTaskTitle = html.find("#taskinput").val();
//             html.find("#taskinput").val("");
//             handler(newTaskTitle);
//         });
//     },
//     addTask: function(taskView){
//         html.find("#tasklist").append(taskView.getHtml());
//     }
// }

// init();
// return public;