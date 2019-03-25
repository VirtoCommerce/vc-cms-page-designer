/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class App {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        this.list = [];
    }
    run() {
        this.dispatcher.handleMessage =
            (handler, msg) => {
                handler.execute(msg, this.list);
            };
        this.dispatcher.run();
        this.reloadResources();
    }
    reloadResources() {
        var urlParams = new URLSearchParams(window.location.search);
        var prefix = urlParams.get('preview_mode');
        var suffix = "?preview_mode=" + prefix + "&v=" + (new Date().getTime());
        var nodes = document.getElementsByTagName("link");
        var head = document.getElementsByTagName("head").item(0);
        function generateLinkNode(url) {
            var result = document.createElement("link");
            result.setAttribute("rel", "stylesheet");
            result.setAttribute("type", "text/css");
            result.setAttribute("href", url);
            return result;
        }
        for (var i = 0; i < nodes.length; i++) {
            var styleSheet = nodes[i];
            if (styleSheet.href && styleSheet.href.startsWith(document.location.origin) && styleSheet.href.endsWith(".css")) {
                var url = styleSheet.href + suffix;
                var newlink = generateLinkNode(url);
                head.replaceChild(newlink, styleSheet);
            }
        }
    }
}
exports.App = App;


/***/ }),

/***/ "./block.view-model.ts":
/*!*****************************!*\
  !*** ./block.view-model.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = __webpack_require__(/*! ./service-locator */ "./service-locator.ts");
class BlockViewModel {
    constructor() {
        this.onSelect = () => {
            this.eventsDispatcher.selectBlock(this);
        };
        this.onLeave = () => {
            this.eventsDispatcher.unlightBlock();
        };
        this.onHover = () => {
            this.eventsDispatcher.highlightBlock(this);
        };
    }
    get eventsDispatcher() {
        return service_locator_1.ServiceLocator.getDispatcher();
    }
}
exports.BlockViewModel = BlockViewModel;


/***/ }),

/***/ "./environment.ts":
/*!************************!*\
  !*** ./environment.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = {
    RenderBlockApiUrl: '/designer-preview/block',
    DesignerUrl: 'http://localhost/'
    // DesignerUrl: 'http://vc-admin-test.azurewebsites.net/designer'
};


/***/ }),

/***/ "./events.dispatcher.ts":
/*!******************************!*\
  !*** ./events.dispatcher.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EventsDispatcher {
    constructor(factory, messages) {
        this.factory = factory;
        this.messages = messages;
        this.handleMessage = () => { };
    }
    run() {
        window.addEventListener('message', (event) => {
            if (event.data) {
                this.handleEvent(event.data);
            }
        });
    }
    selectBlock(vm) {
        if (!!vm && vm.source) {
            this.handleEvent({ type: 'select', content: vm.source });
            this.messages.selectBlock(vm.source);
            vm.selected = false;
        }
        else {
            this.handleEvent({ type: 'select', content: { id: 0 } });
            this.messages.selectBlock(null);
            if (!!vm) {
                vm.selected = true;
            }
        }
    }
    highlightBlock(vm) {
        this.messages.blockHover(vm.source);
    }
    unlightBlock() {
        this.messages.blockHover({ id: 0 });
    }
    swapBlock() {
    }
    handleEvent(msg) {
        const handler = this.factory.get(msg.type);
        if (handler) {
            this.handleMessage(handler, msg);
        }
    }
}
exports.EventsDispatcher = EventsDispatcher;


/***/ }),

/***/ "./handlers.factory.ts":
/*!*****************************!*\
  !*** ./handlers.factory.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const handlers = __webpack_require__(/*! ./handlers */ "./handlers/index.ts");
class HandlersFactory {
    get(key) {
        return HandlersFactory.handlers.find(x => x.key == key);
    }
}
HandlersFactory.handlers = [
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
    new handlers.HoverHandler()
];
exports.HandlersFactory = HandlersFactory;


/***/ }),

/***/ "./handlers/add.handler.ts":
/*!*********************************!*\
  !*** ./handlers/add.handler.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class AddHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'add';
    }
    executeInternal(msg, list, vm) {
        this.clearPreview(list);
        list.push(vm);
        vm.selected = true;
        this.reloadBlock(vm.source).then(result => {
            vm.htmlString = result;
            this.renderer.add(vm);
            this.renderer.select(vm);
        });
    }
}
exports.AddHandler = AddHandler;


/***/ }),

/***/ "./handlers/base.handler.ts":
/*!**********************************!*\
  !*** ./handlers/base.handler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const block_view_model_1 = __webpack_require__(/*! ../block.view-model */ "./block.view-model.ts");
const service_locator_1 = __webpack_require__(/*! ../service-locator */ "./service-locator.ts");
class BaseHandler {
    get renderer() {
        return service_locator_1.ServiceLocator.getRenderer();
    }
    execute(msg, list) {
        let vm = this.getViewModel(msg.content.id, list);
        if (!vm) {
            vm = this.createViewModel(msg.content);
        }
        this.executeInternal(msg, list, vm);
    }
    executeInternal(msg, list, vm) { }
    reloadBlock(model) {
        return service_locator_1.ServiceLocator.getHttp().post(model);
    }
    generateId(id) {
        if (id) {
            return `instance${id}`;
        }
        return 'preview-instance';
    }
    createViewModel(content, isPreview = false) {
        const result = new block_view_model_1.BlockViewModel();
        Object.assign(result, {
            id: this.generateId(content.id),
            source: content,
            element: null,
            isPreview: isPreview,
            htmlString: null,
            selected: false,
            hidden: !!content.hidden
        });
        return result;
    }
    getViewModel(id, list) {
        const internalId = this.generateId(id);
        return list.find(x => x.id === internalId);
    }
    deselectAll(list) {
        list.forEach(x => x.selected = false);
    }
    clearPreview(list) {
        const listToRemove = list.map((item, index) => ({ item, index })).filter(x => x.item.isPreview);
        listToRemove.forEach(x => {
            list.splice(x.index, 1);
            x.item.element.remove();
        });
    }
}
exports.BaseHandler = BaseHandler;


/***/ }),

/***/ "./handlers/clone.handler.ts":
/*!***********************************!*\
  !*** ./handlers/clone.handler.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class CloneHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'clone';
    }
    execute(msg, list) {
        this.deselectAll(list);
        const source = this.getViewModel(msg.content.source, list);
        const model = Object.assign({}, source.source, { id: msg.content.destination });
        const clone = this.createViewModel(model);
        clone.htmlString = source.htmlString;
        clone.hidden = source.hidden;
        clone.selected = true;
        const index = list.indexOf(source);
        list.splice(index + 1, 0, clone);
        this.renderer.insert(clone, index + 1);
        this.renderer.select(clone);
        setTimeout(() => {
            this.renderer.scrollTo(clone);
        }, 300);
    }
}
exports.CloneHandler = CloneHandler;


/***/ }),

/***/ "./handlers/hide.handler.ts":
/*!**********************************!*\
  !*** ./handlers/hide.handler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class HideHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'hide';
    }
    executeInternal(msg, list, vm) {
        vm.hidden = true;
        vm.element.style.display = 'none';
    }
}
exports.HideHandler = HideHandler;


/***/ }),

/***/ "./handlers/hover.handler.ts":
/*!***********************************!*\
  !*** ./handlers/hover.handler.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class HoverHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'hover';
    }
    execute(msg, list) {
        this.deselectAll(list);
        const content = msg.content;
        if (!content.id) {
            this.renderer.hover();
        }
        else {
            super.execute(msg, list);
        }
    }
    executeInternal(msg, list, vm) {
        this.renderer.hover(vm);
    }
}
exports.HoverHandler = HoverHandler;


/***/ }),

/***/ "./handlers/index.ts":
/*!***************************!*\
  !*** ./handlers/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./add.handler */ "./handlers/add.handler.ts"));
__export(__webpack_require__(/*! ./clone.handler */ "./handlers/clone.handler.ts"));
__export(__webpack_require__(/*! ./hide.handler */ "./handlers/hide.handler.ts"));
__export(__webpack_require__(/*! ./hover.handler */ "./handlers/hover.handler.ts"));
__export(__webpack_require__(/*! ./preview.handler */ "./handlers/preview.handler.ts"));
__export(__webpack_require__(/*! ./remove.handler */ "./handlers/remove.handler.ts"));
__export(__webpack_require__(/*! ./select.handler */ "./handlers/select.handler.ts"));
__export(__webpack_require__(/*! ./show.handler */ "./handlers/show.handler.ts"));
__export(__webpack_require__(/*! ./swap.handler */ "./handlers/swap.handler.ts"));
__export(__webpack_require__(/*! ./update.handler */ "./handlers/update.handler.ts"));
__export(__webpack_require__(/*! ./reload.handler */ "./handlers/reload.handler.ts"));
__export(__webpack_require__(/*! ./page.handler */ "./handlers/page.handler.ts"));


/***/ }),

/***/ "./handlers/page.handler.ts":
/*!**********************************!*\
  !*** ./handlers/page.handler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = __webpack_require__(/*! ./../service-locator */ "./service-locator.ts");
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class PageHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'page';
    }
    execute(msg, list) {
        console.log(msg);
        const blocks = msg.content.blocks;
        blocks.forEach(x => {
            const vm = this.createViewModel(x);
            list.push(vm);
        });
        Promise.all(list.map(x => {
            const promise = this.reloadBlock(x.source).then(html => {
                x.htmlString = html;
                return html;
            });
            return promise;
        })).then(() => {
            list.forEach(x => {
                this.renderer.add(x);
            });
            service_locator_1.ServiceLocator.getMessages().renderComplete();
        });
    }
}
exports.PageHandler = PageHandler;


/***/ }),

/***/ "./handlers/preview.handler.ts":
/*!*************************************!*\
  !*** ./handlers/preview.handler.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class PreviewHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'preview';
    }
    execute(msg, list) {
        this.clearPreview(list);
        if (!!msg.content) {
            const vm = this.createViewModel(msg.content, true);
            list.push(vm);
            this.reloadBlock(vm.source).then(result => {
                vm.htmlString = result;
                this.renderer.add(vm);
                this.renderer.scrollTo(vm);
            });
        }
    }
}
exports.PreviewHandler = PreviewHandler;


/***/ }),

/***/ "./handlers/reload.handler.ts":
/*!************************************!*\
  !*** ./handlers/reload.handler.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class ReloadHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'reload';
    }
    execute(msg, list) {
        document.location.reload();
    }
}
exports.ReloadHandler = ReloadHandler;


/***/ }),

/***/ "./handlers/remove.handler.ts":
/*!************************************!*\
  !*** ./handlers/remove.handler.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class RemoveHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'remove';
    }
    executeInternal(msg, list, vm) {
        const index = list.indexOf(vm);
        list.splice(index, 1);
        vm.element.remove();
        this.renderer.select();
    }
}
exports.RemoveHandler = RemoveHandler;


/***/ }),

/***/ "./handlers/select.handler.ts":
/*!************************************!*\
  !*** ./handlers/select.handler.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class SelectHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'select';
    }
    execute(msg, list) {
        this.deselectAll(list);
        this.clearPreview(list);
        const content = msg.content;
        if (content.id === 0) {
            this.renderer.select();
        }
        else {
            super.execute(msg, list);
        }
    }
    executeInternal(msg, list, vm) {
        vm.selected = true;
        this.renderer.select(vm);
        this.renderer.scrollTo(vm);
    }
}
exports.SelectHandler = SelectHandler;


/***/ }),

/***/ "./handlers/show.handler.ts":
/*!**********************************!*\
  !*** ./handlers/show.handler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class ShowHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'show';
    }
    executeInternal(msg, list, vm) {
        vm.hidden = false;
        vm.element.style.display = 'block';
        this.renderer.scrollTo(vm);
    }
}
exports.ShowHandler = ShowHandler;


/***/ }),

/***/ "./handlers/swap.handler.ts":
/*!**********************************!*\
  !*** ./handlers/swap.handler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class SwapHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'swap';
    }
    execute(msg, list) {
        const vm = list[msg.content.currentIndex];
        list.splice(msg.content.currentIndex, 1);
        list.splice(msg.content.newIndex, 0, vm);
        vm.element.remove();
        this.renderer.insert(vm, msg.content.newIndex);
    }
}
exports.SwapHandler = SwapHandler;


/***/ }),

/***/ "./handlers/update.handler.ts":
/*!************************************!*\
  !*** ./handlers/update.handler.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_handler_1 = __webpack_require__(/*! ./base.handler */ "./handlers/base.handler.ts");
class UpdateHandler extends base_handler_1.BaseHandler {
    constructor() {
        super(...arguments);
        this.key = 'update';
    }
    executeInternal(msg, list, vm) {
        vm.source = msg.content;
        this.reloadBlock(vm.source).then((result) => {
            vm.htmlString = result;
            this.renderer.update(vm);
            this.renderer.select(vm);
        });
    }
}
exports.UpdateHandler = UpdateHandler;


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = __webpack_require__(/*! ./service-locator */ "./service-locator.ts");
document.addEventListener('DOMContentLoaded', () => {
    console.log('run preview window');
    const app = service_locator_1.ServiceLocator.createApp();
    app.run();
});


/***/ }),

/***/ "./preview.interactor.ts":
/*!*******************************!*\
  !*** ./preview.interactor.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = __webpack_require__(/*! ./service-locator */ "./service-locator.ts");
class PreviewInteractor {
    constructor() {
        this.borderWidth = 3;
        this.hoveredViewModel = null;
        this.selectedViewModel = null;
        this.createHoverElement();
        this.createSelectElement();
    }
    hover(vm) {
        if (vm == null || this.selectedViewModel == vm) {
            this.hoveredViewModel = null;
            this.hoverElement.style.display = 'none';
        }
        else {
            this.hoveredViewModel = vm;
            this.hoverElement.style.display = 'block';
            this.placeElementHover(vm.element, this.hoverElement);
        }
    }
    select(vm) {
        this.selectedViewModel = vm;
        this.selectElement.style.display = 'block';
        this.placeElementHover(vm.element, this.selectElement);
    }
    deselect() {
        this.hideSelectElement();
        this.selectedViewModel = null;
    }
    scrollTo(vm) {
        const rect = this.measureElement(vm.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    hideSelectElement() {
        this.selectElement.style.display = 'none';
    }
    hideHoverElement() {
        this.hoverElement.style.display = 'none';
    }
    createHoverElement() {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px dotted #33ada9`;
        result.addEventListener('mouseleave', () => {
            this.hideHoverElement();
            this.hoveredViewModel.onLeave();
            this.hoveredViewModel = null;
        });
        result.addEventListener('click', (event) => {
            this.hideHoverElement();
            this.select(this.hoveredViewModel);
            this.hoveredViewModel.onSelect();
        });
        this.hoverElement = result;
        return result;
    }
    createSelectElement() {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px solid #33ada9`;
        result.addEventListener('click', () => {
            const dispatcher = service_locator_1.ServiceLocator.getDispatcher();
            dispatcher.selectBlock(null);
            console.log('click');
        });
        result.addEventListener('mousedown', () => {
            console.log('mousedown');
        });
        this.selectElement = result;
        return result;
    }
    createShadowElement() {
        const result = document.createElement('div');
        result.style.position = 'absolute';
        result.style.display = 'none';
        result.style.zIndex = '10000';
        document.body.appendChild(result);
        return result;
    }
    placeElementHover(source, target) {
        if (!source) {
            return;
        }
        const rect = this.measureElement(source);
        const doubleWidth = this.borderWidth * 2;
        target.style.top = rect.top + 'px';
        target.style.left = rect.left + 'px';
        target.style.height = (rect.height - doubleWidth) + 'px';
        target.style.width = (rect.width - doubleWidth) + 'px';
        target.style.display = 'block';
    }
    measureElement(element) {
        const target = element;
        const target_width = target.offsetWidth;
        const target_height = target.offsetHeight;
        let rect = {};
        let gleft = 0;
        let gtop = 0;
        var moonwalk = function (_parent) {
            if (!!_parent) {
                gleft += _parent.offsetLeft;
                gtop += _parent.offsetTop;
                moonwalk(_parent.offsetParent);
            }
            else {
                return rect = {
                    top: target.offsetTop + gtop,
                    left: target.offsetLeft + gleft,
                    height: target_height,
                    width: target_width
                };
            }
        };
        moonwalk(target.offsetParent);
        return rect;
    }
}
exports.PreviewInteractor = PreviewInteractor;


/***/ }),

/***/ "./renderer.ts":
/*!*********************!*\
  !*** ./renderer.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preview_interactor_1 = __webpack_require__(/*! ./preview.interactor */ "./preview.interactor.ts");
class Renderer {
    constructor(container) {
        this.container = container;
        this.interactor = new preview_interactor_1.PreviewInteractor();
    }
    add(vm) {
        vm.element = this.createElement(vm);
        this.container.append(vm.element);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
    }
    update(vm) {
        const element = vm.element;
        vm.element = this.createElement(vm);
        this.container.replaceChild(vm.element, element);
    }
    insert(vm, index) {
        vm.element = this.createElement(vm);
        const beforeElement = this.container.children.item(index);
        this.container.insertBefore(vm.element, beforeElement);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
    }
    select(vm = null) {
        if (vm === null || vm.hidden || !vm.selected) {
            this.interactor.deselect();
        }
        else {
            this.interactor.select(vm);
        }
    }
    scrollTo(vm) {
        if (vm && vm.element && !vm.hidden) {
            this.interactor.scrollTo(vm);
        }
    }
    hover(vm = null) {
        if (vm === null || vm.hidden || vm.selected) {
            this.interactor.hover(null);
        }
        else {
            this.interactor.hover(vm);
        }
    }
    createElement(vm) {
        const div = document.createElement('div');
        div.innerHTML = `<div>${vm.htmlString}</div>`;
        const result = div.firstChild;
        if (!vm.isPreview) {
            result.addEventListener('mouseover', () => {
                this.interactor.hover(vm);
                vm.onHover();
            });
            result.addEventListener('click', () => vm.onSelect());
        }
        return result;
    }
}
exports.Renderer = Renderer;


/***/ }),

/***/ "./service-locator.ts":
/*!****************************!*\
  !*** ./service-locator.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http_service_1 = __webpack_require__(/*! ./services/http.service */ "./services/http.service.ts");
const events_dispatcher_1 = __webpack_require__(/*! ./events.dispatcher */ "./events.dispatcher.ts");
const renderer_1 = __webpack_require__(/*! ./renderer */ "./renderer.ts");
const handlers_factory_1 = __webpack_require__(/*! ./handlers.factory */ "./handlers.factory.ts");
const environment_1 = __webpack_require__(/*! ./environment */ "./environment.ts");
const app_1 = __webpack_require__(/*! ./app */ "./app.ts");
const messages_service_1 = __webpack_require__(/*! ./services/messages.service */ "./services/messages.service.ts");
class ServiceLocator {
    static createApp() {
        return new app_1.App(this.getDispatcher());
    }
    static getHttp() {
        return this._http || (this._http = new http_service_1.HttpService(environment_1.Environment.RenderBlockApiUrl));
    }
    static getMessages() {
        return this._messages || (this._messages = new messages_service_1.MessagesService(environment_1.Environment.DesignerUrl));
    }
    static getRenderer() {
        return this._renderer || (this._renderer = new renderer_1.Renderer(document.getElementById("designer-preview")));
    }
    static getFactory() {
        return this._factory || (this._factory = new handlers_factory_1.HandlersFactory());
    }
    static getDispatcher() {
        return this._dispatcher || (this._dispatcher = new events_dispatcher_1.EventsDispatcher(this.getFactory(), this.getMessages()));
    }
}
exports.ServiceLocator = ServiceLocator;


/***/ }),

/***/ "./services/http.service.ts":
/*!**********************************!*\
  !*** ./services/http.service.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HttpService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    get() {
    }
    post(model) {
        // https://gist.github.com/codecorsair/e14ec90cee91fa8f56054afaa0a39f13
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('post', this.endpoint);
            xhr.setRequestHeader('Accept', 'application/json, text/javascript, text/plain');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(model));
            // xhr.timeout = timeout;
            xhr.onload = evt => {
                // const result = {
                //     ok: xhr.status >= 200 && xhr.status < 300,
                //     status: xhr.status,
                //     statusText: xhr.statusText,
                //     headers: xhr.getAllResponseHeaders(),
                //     data: xhr.responseText
                // };
                resolve(xhr.responseText.trim());
                // this.blocks.push(model); or replace
            };
            // xhr.onerror = evt => {
            //   resolve(errorResponse(xhr, 'Failed to make request.'));
            // };
            // xhr.ontimeout = evt => {
            //   resolve(errorResponse(xhr, 'Request took longer than expected.'));
            // };
        });
    }
}
exports.HttpService = HttpService;


/***/ }),

/***/ "./services/messages.service.ts":
/*!**************************************!*\
  !*** ./services/messages.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MessagesService {
    constructor(parentOrigin) {
        this.parentOrigin = parentOrigin;
    }
    renderComplete() {
        this.send('render-complete', null);
    }
    blockHover(model) {
        this.send('hover', { id: model.id });
    }
    selectBlock(model) {
        this.send('select', model ? { id: model.id } : null);
    }
    send(message, model) {
        const msg = Object.assign({ type: message }, model);
        if (message !== 'hover') {
            console.log(msg);
        }
        window.parent.postMessage(msg, this.parentOrigin);
    }
}
exports.MessagesService = MessagesService;


/***/ })

/******/ });
//# sourceMappingURL=designer.bundle.js.map