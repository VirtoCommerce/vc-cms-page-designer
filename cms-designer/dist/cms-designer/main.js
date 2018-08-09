(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"layout\">\n    <div class=\"top\">\n        <app-toolbar></app-toolbar>\n    </div>\n    <article class=\"main\">\n        <app-preview></app-preview>\n        <app-sidebar></app-sidebar>\n    </article>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'cms-designer';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-color-picker */ "./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/toolbar/toolbar.component */ "./src/app/components/toolbar/toolbar.component.ts");
/* harmony import */ var _components_preview_preview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/preview/preview.component */ "./src/app/components/preview/preview.component.ts");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var _components_theme_editor_theme_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/theme-editor/theme-editor.component */ "./src/app/components/theme-editor/theme-editor.component.ts");
/* harmony import */ var _components_page_editor_page_editor_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/page-editor/page-editor.component */ "./src/app/components/page-editor/page-editor.component.ts");
/* harmony import */ var _services_theme_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/theme.service */ "./src/app/services/theme.service.ts");
/* harmony import */ var _services_page_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/page.service */ "./src/app/services/page.service.ts");
/* harmony import */ var _controls_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./controls/tabs/tabs.component */ "./src/app/controls/tabs/tabs.component.ts");
/* harmony import */ var _controls_tabs_tab_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./controls/tabs/tab.component */ "./src/app/controls/tabs/tab.component.ts");
/* harmony import */ var _components_theme_editor_theme_item_editor_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/theme-editor/theme-item-editor.component */ "./src/app/components/theme-editor/theme-item-editor.component.ts");
/* harmony import */ var _components_presets_editor_presets_editor_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/presets-editor/presets-editor.component */ "./src/app/components/presets-editor/presets-editor.component.ts");
/* harmony import */ var _controls_color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./controls/color-picker/color-picker.component */ "./src/app/controls/color-picker/color-picker.component.ts");
/* harmony import */ var _controls_select_item_select_item_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./controls/select-item/select-item.component */ "./src/app/controls/select-item/select-item.component.ts");
/* harmony import */ var _controls_checkbox_item_checkbox_item_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./controls/checkbox-item/checkbox-item.component */ "./src/app/controls/checkbox-item/checkbox-item.component.ts");
/* harmony import */ var _controls_image_item_image_item_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./controls/image-item/image-item.component */ "./src/app/controls/image-item/image-item.component.ts");
/* harmony import */ var _controls_text_item_text_item_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./controls/text-item/text-item.component */ "./src/app/controls/text-item/text-item.component.ts");
/* harmony import */ var _controls_color_item_color_item_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./controls/color-item/color-item.component */ "./src/app/controls/color-item/color-item.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_6__["ToolbarComponent"],
                _components_preview_preview_component__WEBPACK_IMPORTED_MODULE_7__["PreviewComponent"],
                _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_8__["SidebarComponent"],
                _components_theme_editor_theme_editor_component__WEBPACK_IMPORTED_MODULE_9__["ThemeEditorComponent"],
                _components_page_editor_page_editor_component__WEBPACK_IMPORTED_MODULE_10__["PageEditorComponent"],
                _controls_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__["TabsComponent"],
                _controls_tabs_tab_component__WEBPACK_IMPORTED_MODULE_14__["TabComponent"],
                _components_theme_editor_theme_item_editor_component__WEBPACK_IMPORTED_MODULE_15__["ThemeItemEditorComponent"],
                _components_presets_editor_presets_editor_component__WEBPACK_IMPORTED_MODULE_16__["PresetsEditorComponent"],
                _controls_color_picker_color_picker_component__WEBPACK_IMPORTED_MODULE_17__["ColorPickerComponent"],
                _controls_select_item_select_item_component__WEBPACK_IMPORTED_MODULE_18__["SelectItemComponent"],
                _controls_checkbox_item_checkbox_item_component__WEBPACK_IMPORTED_MODULE_19__["CheckboxItemComponent"],
                _controls_image_item_image_item_component__WEBPACK_IMPORTED_MODULE_20__["ImageItemComponent"],
                _controls_text_item_text_item_component__WEBPACK_IMPORTED_MODULE_21__["TextItemComponent"],
                _controls_color_item_color_item_component__WEBPACK_IMPORTED_MODULE_22__["ColorItemComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                ngx_color_picker__WEBPACK_IMPORTED_MODULE_3__["ColorPickerModule"]
            ],
            providers: [
                _services_theme_service__WEBPACK_IMPORTED_MODULE_11__["ThemeService"],
                _services_page_service__WEBPACK_IMPORTED_MODULE_12__["PageService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/page-editor/page-editor.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/page-editor/page-editor.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  page-editor works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/page-editor/page-editor.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/components/page-editor/page-editor.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/page-editor/page-editor.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/page-editor/page-editor.component.ts ***!
  \*****************************************************************/
/*! exports provided: PageEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageEditorComponent", function() { return PageEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageEditorComponent = /** @class */ (function () {
    function PageEditorComponent() {
        this.loadedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PageEditorComponent.prototype.ngOnInit = function () {
        this.loadedEvent.emit(true);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PageEditorComponent.prototype, "loadedEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PageEditorComponent.prototype, "selectEvent", void 0);
    PageEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-editor',
            template: __webpack_require__(/*! ./page-editor.component.html */ "./src/app/components/page-editor/page-editor.component.html"),
            styles: [__webpack_require__(/*! ./page-editor.component.scss */ "./src/app/components/page-editor/page-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PageEditorComponent);
    return PageEditorComponent;
}());



/***/ }),

/***/ "./src/app/components/presets-editor/presets-editor.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/components/presets-editor/presets-editor.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pane-cnt\">\n\n    <div class=\"new-pressets-foot\">\n        <label class=\"form-label new-preset-label\">Preset name</label>\n\n        <button class=\"btn\">Save</button>\n        <button class=\"btn\">Cancel</button>\n    </div>\n\n    <div class=\"pressets-foot\">\n        <button class=\"btn\">Save current as new presset</button>\n    </div>\n\n</div>"

/***/ }),

/***/ "./src/app/components/presets-editor/presets-editor.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/components/presets-editor/presets-editor.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/presets-editor/presets-editor.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/presets-editor/presets-editor.component.ts ***!
  \***********************************************************************/
/*! exports provided: PresetsEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresetsEditorComponent", function() { return PresetsEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PresetsEditorComponent = /** @class */ (function () {
    function PresetsEditorComponent() {
    }
    PresetsEditorComponent.prototype.ngOnInit = function () {
    };
    PresetsEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-presets-editor',
            template: __webpack_require__(/*! ./presets-editor.component.html */ "./src/app/components/presets-editor/presets-editor.component.html"),
            styles: [__webpack_require__(/*! ./presets-editor.component.scss */ "./src/app/components/presets-editor/presets-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PresetsEditorComponent);
    return PresetsEditorComponent;
}());



/***/ }),

/***/ "./src/app/components/preview/preview.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/preview/preview.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"theme-cnt\">\n    <div class=\"theme-preview\" data-size=\"desktop\">\n        <!-- <iframe src=\"http://virtocommerce.com\" scrolling=\"yes\"></iframe> -->\n    </div>\n    <a class=\"theme-toggle js-toggle\"></a>\n    <ul class=\"list __nav\">\n        <li class=\"list-item\">\n            <a class=\"list-link __selected js-size\" data-size=\"desktop\">\n                <i class=\"list-ico fa fa-desktop\"></i>\n                Desktop\n            </a>\n        </li>\n        <li class=\"list-item\">\n            <a class=\"list-link js-size\" data-size=\"tablet\">\n                <i class=\"list-ico fa fa-tablet\"></i>\n                Tablet\n            </a>\n        </li>\n        <li class=\"list-item\">\n            <a class=\"list-link js-size\" data-size=\"mobile\">\n                <i class=\"list-ico fa fa-mobile\"></i>\n                Mobile\n            </a>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "./src/app/components/preview/preview.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/preview/preview.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/preview/preview.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/preview/preview.component.ts ***!
  \*********************************************************/
/*! exports provided: PreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewComponent", function() { return PreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PreviewComponent = /** @class */ (function () {
    function PreviewComponent() {
    }
    PreviewComponent.prototype.ngOnInit = function () {
    };
    PreviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-preview',
            template: __webpack_require__(/*! ./preview.component.html */ "./src/app/components/preview/preview.component.html"),
            styles: [__webpack_require__(/*! ./preview.component.scss */ "./src/app/components/preview/preview.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PreviewComponent);
    return PreviewComponent;
}());



/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"theme-sidebar\">\n    <div class=\"loader\" *ngIf=\"isPageLoading || isThemeLoading\">\n        <div class=\"loading\">\n            <img src=\"assets/images/loader.gif\" alt=\"\">\n        </div>\n    </div>\n    <div class=\"sidebar-main\">\n        <div class=\"pane pane-index\" [class.__disabled]=\"selected != null\">\n            <div class=\"pane-head\">\n                <div class=\"pane-t\">Boundless</div>\n            </div>\n            <div class=\"pane-cnt\">\n                <app-tabs>\n                    <app-tab tabTitle=\"Sections\">\n                        <app-page-editor (selectEvent)=\"selected = $event\"></app-page-editor>\n                    </app-tab>\n                    <app-tab tabTitle=\"Theme\" active=\"true\">\n                        <app-theme-editor [settings]=\"settings\" [presets]=\"presets\" (selectEvent)=\"selected = $event\"></app-theme-editor>\n                    </app-tab>\n                </app-tabs>\n            </div>\n        </div>\n        <app-theme-item-editor class=\"pane\" [class.__selected]=\"selected != null\" [item]=\"selected\" [theme]=\"theme\" (backEvent)=\"selected = null\"></app-theme-item-editor>\n    </div>\n    <div class=\"sidebar-foot\">\n        <button class=\"btn\">Clear changes</button>\n        <button class=\"btn\">Save changes</button>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/sidebar/sidebar.component.ts ***!
  \*********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_theme_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/theme.service */ "./src/app/services/theme.service.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(themeService) {
        this.themeService = themeService;
        this.isPageLoading = false;
        this.isThemeLoading = true;
        this.selected = null;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.themeService.loadData().subscribe(function (_a) {
            var presets = _a[0], settings = _a[1];
            _this.presets = presets;
            _this.settings = settings;
            _this.theme = __assign({}, presets.presets[presets.current]);
            _this.isThemeLoading = false;
        });
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/components/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_theme_service__WEBPACK_IMPORTED_MODULE_1__["ThemeService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/components/theme-editor/theme-editor.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-editor.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul class=\"list\">\n    <li class=\"list-item\">\n        <a class=\"list-link\" (click)=\"selectPresets()\"><i class=\"list-ico fa fa-wrench\"></i><span class=\"list-t\"> Presets </span></a>\n    </li>\n    <li class=\"list-item\" *ngFor=\"let item of settings\">\n        <a class=\"list-link\" (click)=\"selectItem(item)\"><i class=\"list-ico fa fa-{{ item.icon }}\"></i><span class=\"list-t\"> {{ item.name }} </span></a>\n    </li>\n</ul>"

/***/ }),

/***/ "./src/app/components/theme-editor/theme-editor.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-editor.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/theme-editor/theme-editor.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-editor.component.ts ***!
  \*******************************************************************/
/*! exports provided: ThemeEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeEditorComponent", function() { return ThemeEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ThemeEditorComponent = /** @class */ (function () {
    function ThemeEditorComponent() {
        this.selectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ThemeEditorComponent.prototype.ngOnInit = function () {
    };
    ThemeEditorComponent.prototype.selectPresets = function () {
        this.selectEvent.emit(this.presets);
    };
    ThemeEditorComponent.prototype.selectItem = function (item) {
        this.selectEvent.emit(item);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ThemeEditorComponent.prototype, "settings", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ThemeEditorComponent.prototype, "presets", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ThemeEditorComponent.prototype, "selectEvent", void 0);
    ThemeEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-theme-editor',
            template: __webpack_require__(/*! ./theme-editor.component.html */ "./src/app/components/theme-editor/theme-editor.component.html"),
            styles: [__webpack_require__(/*! ./theme-editor.component.scss */ "./src/app/components/theme-editor/theme-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ThemeEditorComponent);
    return ThemeEditorComponent;
}());



/***/ }),

/***/ "./src/app/components/theme-editor/theme-item-editor.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-item-editor.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pane-section __selected\" *ngIf=\"item\">\n    <div class=\"pane-head\">\n        <a class=\"pane-back\" (click)=\"back()\">\n            <i class=\"pane-ico fa fa-chevron-left\"></i>\n        </a>\n        <div class=\"pane-t\">\n            <i class=\"pane-ico fa fa-{{ item.icon }}\"></i>\n            {{ item.name }}\n        </div>\n    </div>\n    <div class=\"pane-cnt\">\n        <div class=\"pane-settings\" [class.pane-t]=\"el.type === 'header'\" *ngFor=\"let el of item.settings\">\n\n            <!-- Header or Paragraph -->\n            {{el.content}}\n\n            <!-- Color picker -->\n            <app-color-item *ngIf=\"el.type === 'color'\" [theme]=\"theme\" [model]=\"el\"></app-color-item>\n            <!-- Select -->\n            <app-select-item *ngIf=\"el.type === 'select'\" [theme]=\"theme\" [model]=\"el\"></app-select-item>\n            <!-- Checkbox -->\n            <app-checkbox-item *ngIf=\"el.type === 'checkbox'\" [theme]=\"theme\" [model]=\"el\"></app-checkbox-item>\n            <!-- Image -->\n\n            <!-- Input type=\"text\" -->\n            <app-text-item *ngIf=\"el.type === 'text'\" [theme]=\"theme\" [model]=\"el\"></app-text-item>\n            <!-- Info -->\n            <p *ngIf=\"el.type !== 'image' && el.info !== undefined\" class=\"form-help\">{{el.info}}</p>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/theme-editor/theme-item-editor.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-item-editor.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/theme-editor/theme-item-editor.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/components/theme-editor/theme-item-editor.component.ts ***!
  \************************************************************************/
/*! exports provided: ThemeItemEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeItemEditorComponent", function() { return ThemeItemEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ThemeItemEditorComponent = /** @class */ (function () {
    function ThemeItemEditorComponent() {
        this.backEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ThemeItemEditorComponent.prototype.ngAfterViewInit = function () { };
    ThemeItemEditorComponent.prototype.ngOnInit = function () {
    };
    ThemeItemEditorComponent.prototype.back = function () {
        this.backEvent.emit(null);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ThemeItemEditorComponent.prototype, "item", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ThemeItemEditorComponent.prototype, "theme", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ThemeItemEditorComponent.prototype, "backEvent", void 0);
    ThemeItemEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-theme-item-editor',
            template: __webpack_require__(/*! ./theme-item-editor.component.html */ "./src/app/components/theme-editor/theme-item-editor.component.html"),
            styles: [__webpack_require__(/*! ./theme-item-editor.component.scss */ "./src/app/components/theme-editor/theme-item-editor.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ThemeItemEditorComponent);
    return ThemeItemEditorComponent;
}());



/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/toolbar/toolbar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul class=\"menu\">\n    <li class=\"menu-item\">\n        <a href=\"#\" class=\"menu-link\">\n            <i class=\"menu-ico fa fa-home\"></i>\n            Back\n        </a>\n    </li>\n    <li class=\"menu-item\">\n        <a href=\"#\" class=\"menu-link\">\n            <i class=\"menu-ico fa fa-code\"></i>\n            Edit HTML/CSS\n        </a>\n    </li>\n    <li class=\"menu-item\">\n        <a href=\"#\" class=\"menu-link\">\n            <i class=\"menu-ico fa fa-globe\"></i>\n            Edit languages\n        </a>\n    </li>\n    <li class=\"menu-item\">\n        <a href=\"#\" class=\"menu-link\">\n            <i class=\"menu-ico fa fa-map\"></i>\n            Edit navigation\n        </a>\n    </li>\n</ul>"

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/components/toolbar/toolbar.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/toolbar/toolbar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/toolbar/toolbar.component.ts ***!
  \*********************************************************/
/*! exports provided: ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent() {
    }
    ToolbarComponent.prototype.ngOnInit = function () {
    };
    ToolbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-toolbar',
            template: __webpack_require__(/*! ./toolbar.component.html */ "./src/app/components/toolbar/toolbar.component.html"),
            styles: [__webpack_require__(/*! ./toolbar.component.scss */ "./src/app/components/toolbar/toolbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ToolbarComponent);
    return ToolbarComponent;
}());



/***/ }),

/***/ "./src/app/controls/checkbox-item/checkbox-item.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/controls/checkbox-item/checkbox-item.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pane-row\">\n    <div class=\"form-input\">\n        <label class=\"form-label __switch\">\n            <input type=\"checkbox\" [(ngModel)]=\"theme[model.id]\">\n            <span class=\"switch\"></span>\n        </label>\n    </div>\n    <div class=\"pane-name\">{{model.label}}</div>\n</div>"

/***/ }),

/***/ "./src/app/controls/checkbox-item/checkbox-item.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/controls/checkbox-item/checkbox-item.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/checkbox-item/checkbox-item.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/controls/checkbox-item/checkbox-item.component.ts ***!
  \*******************************************************************/
/*! exports provided: CheckboxItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxItemComponent", function() { return CheckboxItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CheckboxItemComponent = /** @class */ (function () {
    function CheckboxItemComponent() {
    }
    CheckboxItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CheckboxItemComponent.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CheckboxItemComponent.prototype, "theme", void 0);
    CheckboxItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkbox-item',
            template: __webpack_require__(/*! ./checkbox-item.component.html */ "./src/app/controls/checkbox-item/checkbox-item.component.html"),
            styles: [__webpack_require__(/*! ./checkbox-item.component.scss */ "./src/app/controls/checkbox-item/checkbox-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CheckboxItemComponent);
    return CheckboxItemComponent;
}());



/***/ }),

/***/ "./src/app/controls/color-item/color-item.component.html":
/*!***************************************************************!*\
  !*** ./src/app/controls/color-item/color-item.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pane-row\">\n    <app-color-picker [value]=\"theme[model.id]\" (valueChanged)=\"valueChanged($event)\"></app-color-picker>\n    <div class=\"pane-col pane-name\">{{model.label}}</div>\n</div>\n"

/***/ }),

/***/ "./src/app/controls/color-item/color-item.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/controls/color-item/color-item.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/color-item/color-item.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/controls/color-item/color-item.component.ts ***!
  \*************************************************************/
/*! exports provided: ColorItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorItemComponent", function() { return ColorItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorItemComponent = /** @class */ (function () {
    function ColorItemComponent() {
    }
    ColorItemComponent.prototype.ngOnInit = function () { };
    ColorItemComponent.prototype.valueChanged = function ($event) {
        this.theme[this.model.id] = $event;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ColorItemComponent.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ColorItemComponent.prototype, "theme", void 0);
    ColorItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-color-item',
            template: __webpack_require__(/*! ./color-item.component.html */ "./src/app/controls/color-item/color-item.component.html"),
            styles: [__webpack_require__(/*! ./color-item.component.scss */ "./src/app/controls/color-item/color-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ColorItemComponent);
    return ColorItemComponent;
}());



/***/ }),

/***/ "./src/app/controls/color-picker/color-picker.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/controls/color-picker/color-picker.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pane-col pane-color\" \n     [(colorPicker)]=\"value\" \n     (colorPickerChange)=\"raiseValueChanged($event)\"\n     [cpOKButton]=\"true\"\n     [cpOKButtonClass]=\"'btn'\">\n    <div class='bg' [style.background]=\"value\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/controls/color-picker/color-picker.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/controls/color-picker/color-picker.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/color-picker/color-picker.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/controls/color-picker/color-picker.component.ts ***!
  \*****************************************************************/
/*! exports provided: ColorPickerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerComponent", function() { return ColorPickerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorPickerComponent = /** @class */ (function () {
    function ColorPickerComponent() {
        this.valueChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ColorPickerComponent.prototype.ngOnInit = function () {
    };
    ColorPickerComponent.prototype.raiseValueChanged = function ($event) {
        this.valueChanged.emit($event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ColorPickerComponent.prototype, "value", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ColorPickerComponent.prototype, "valueChanged", void 0);
    ColorPickerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-color-picker',
            template: __webpack_require__(/*! ./color-picker.component.html */ "./src/app/controls/color-picker/color-picker.component.html"),
            styles: [__webpack_require__(/*! ./color-picker.component.scss */ "./src/app/controls/color-picker/color-picker.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ColorPickerComponent);
    return ColorPickerComponent;
}());



/***/ }),

/***/ "./src/app/controls/image-item/image-item.component.html":
/*!***************************************************************!*\
  !*** ./src/app/controls/image-item/image-item.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <label ng-if=\"setting.type === 'image'\" for=\"{{setting.id}}\" class=\"form-label\">{{setting.label}}</label>\n<div ng-if=\"setting.type === 'image'\" id=\"{{setting.id}}\" class=\"form-file\" editor-set-image model=\"editor.model[setting.id]\"></div>\n<p ng-if=\"setting.type === 'image' && setting.info !== undefined\" class=\"form-help\">{{setting.info}}</p>\n<div ng-if=\"setting.type === 'image'\" class=\"form-img\"></div> -->"

/***/ }),

/***/ "./src/app/controls/image-item/image-item.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/controls/image-item/image-item.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/image-item/image-item.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/controls/image-item/image-item.component.ts ***!
  \*************************************************************/
/*! exports provided: ImageItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageItemComponent", function() { return ImageItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImageItemComponent = /** @class */ (function () {
    function ImageItemComponent() {
    }
    ImageItemComponent.prototype.ngOnInit = function () {
    };
    ImageItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-image-item',
            template: __webpack_require__(/*! ./image-item.component.html */ "./src/app/controls/image-item/image-item.component.html"),
            styles: [__webpack_require__(/*! ./image-item.component.scss */ "./src/app/controls/image-item/image-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ImageItemComponent);
    return ImageItemComponent;
}());



/***/ }),

/***/ "./src/app/controls/select-item/select-item.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/controls/select-item/select-item.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<label *ngIf=\"model.label !== undefined\" [for]=\"model.id\" class=\"form-label\">{{model.label}}</label>\n<div class=\"form-input __select\">\n    <select [id]=\"model.id\" [(ngModel)]=\"theme[model.id]\">\n        <option *ngFor=\"let option of model.options\" value=\"{{option.value}}\">\n            {{option.label}}\n        </option>\n    </select>\n</div>\n"

/***/ }),

/***/ "./src/app/controls/select-item/select-item.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/controls/select-item/select-item.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/select-item/select-item.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/controls/select-item/select-item.component.ts ***!
  \***************************************************************/
/*! exports provided: SelectItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectItemComponent", function() { return SelectItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectItemComponent = /** @class */ (function () {
    function SelectItemComponent() {
    }
    SelectItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SelectItemComponent.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SelectItemComponent.prototype, "theme", void 0);
    SelectItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-select-item',
            template: __webpack_require__(/*! ./select-item.component.html */ "./src/app/controls/select-item/select-item.component.html"),
            styles: [__webpack_require__(/*! ./select-item.component.scss */ "./src/app/controls/select-item/select-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SelectItemComponent);
    return SelectItemComponent;
}());



/***/ }),

/***/ "./src/app/controls/tabs/tab.component.ts":
/*!************************************************!*\
  !*** ./src/app/controls/tabs/tab.component.ts ***!
  \************************************************/
/*! exports provided: TabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return TabComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TabComponent = /** @class */ (function () {
    function TabComponent() {
        this.active = false;
    }
    TabComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TabComponent.prototype, "tabTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TabComponent.prototype, "active", void 0);
    TabComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tab',
            template: "<div [hidden]=\"!active\"><ng-content></ng-content></div>"
        }),
        __metadata("design:paramtypes", [])
    ], TabComponent);
    return TabComponent;
}());



/***/ }),

/***/ "./src/app/controls/tabs/tabs.component.scss":
/*!***************************************************!*\
  !*** ./src/app/controls/tabs/tabs.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav {\n  display: flex;\n  margin-bottom: 1rem; }\n  .nav .tab {\n    align-items: stretch;\n    flex: 1 1 0%;\n    flex-flow: row nowrap;\n    text-align: center; }\n  .nav .tab a {\n      padding: 16px;\n      margin: 0 0.4rem;\n      display: block;\n      border-bottom: 3px solid transparent; }\n  .nav .tab a:hover {\n        border-bottom-color: #c4cdd5; }\n  .nav .tab.active a {\n      border-bottom-color: #5c6ac4; }\n"

/***/ }),

/***/ "./src/app/controls/tabs/tabs.component.ts":
/*!*************************************************!*\
  !*** ./src/app/controls/tabs/tabs.component.ts ***!
  \*************************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tab_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab.component */ "./src/app/controls/tabs/tab.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    TabsComponent.prototype.selectTab = function (tab) {
        this.tabs.toArray().forEach(function (t) { return t.active = false; });
        tab.active = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(_tab_component__WEBPACK_IMPORTED_MODULE_1__["TabComponent"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], TabsComponent.prototype, "tabs", void 0);
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tabs',
            template: "\n        <div class=\"nav\">\n            <div class=\"tab\" *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n                <a href=\"#\">{{tab.tabTitle}}</a>\n            </div>\n        </div>\n        <ng-content></ng-content>\n    ",
            styles: [__webpack_require__(/*! ./tabs.component.scss */ "./src/app/controls/tabs/tabs.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/controls/text-item/text-item.component.html":
/*!*************************************************************!*\
  !*** ./src/app/controls/text-item/text-item.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<label [for]=\"model.id\" class=\"form-label\">{{model.label}}</label>\n<div class=\"form-input\">\n    <input [id]=\"model.id\" type=\"text\" value=\"{{model.default}}\" [(ngModel)]=\"theme[model.id]\">\n</div>"

/***/ }),

/***/ "./src/app/controls/text-item/text-item.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/controls/text-item/text-item.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/controls/text-item/text-item.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/controls/text-item/text-item.component.ts ***!
  \***********************************************************/
/*! exports provided: TextItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextItemComponent", function() { return TextItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextItemComponent = /** @class */ (function () {
    function TextItemComponent() {
    }
    TextItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextItemComponent.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextItemComponent.prototype, "theme", void 0);
    TextItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-text-item',
            template: __webpack_require__(/*! ./text-item.component.html */ "./src/app/controls/text-item/text-item.component.html"),
            styles: [__webpack_require__(/*! ./text-item.component.scss */ "./src/app/controls/text-item/text-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TextItemComponent);
    return TextItemComponent;
}());



/***/ }),

/***/ "./src/app/services/page.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/page.service.ts ***!
  \******************************************/
/*! exports provided: PageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageService", function() { return PageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageService = /** @class */ (function () {
    function PageService() {
    }
    PageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], PageService);
    return PageService;
}());



/***/ }),

/***/ "./src/app/services/theme.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/theme.service.ts ***!
  \*******************************************/
/*! exports provided: ThemeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeService", function() { return ThemeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ThemeService = /** @class */ (function () {
    function ThemeService(http) {
        this.http = http;
    }
    ThemeService.prototype.loadData = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(this.http.get('data/settings_data.json'), this.http.get('data/settings_schema.json'));
    };
    ThemeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ThemeService);
    return ThemeService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Work\Develops\VirtoWay\code\vc-cms-page-designer\cms-designer\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map