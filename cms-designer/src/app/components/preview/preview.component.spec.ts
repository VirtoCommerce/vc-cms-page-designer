// import { By, DomSanitizer } from '@angular/platform-browser';
// import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { Store } from '@ngrx/store';

// import { PreviewComponent } from './preview.component';
// // import { PreviewModeButtonComponent } from './preview-mode-button/preview-mode-button.component';

// import * as rootActions from '@state/root.actions';

// describe('PreviewComponent', () => {
//     let fixture: ComponentFixture<PreviewComponent>;
//     let store;

//     beforeEach(() => {
//         store = jasmine.createSpyObj(['dispatch']);
//         TestBed.configureTestingModule({
//             declarations: [PreviewComponent, PreviewModeButtonComponent],
//             providers: [
//                 { provide: Store, useValue: store }
//             ]
//         });
//         fixture = TestBed.createComponent(PreviewComponent);
//     });

//     it('should use the given storeUrl', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
//         const url = 'http://localhost/';
//         const safeUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
//         fixture.componentInstance.storeUrl = safeUrl;

//         fixture.detectChanges();

//         const frame = <HTMLIFrameElement>fixture.debugElement.query(By.css('iframe')).nativeElement;

//         expect(frame.src).toBe(url);
//     }));

//     it('should select the correct button for given mode', () => {
//         const mode = 'desktop';
//         fixture.componentInstance.mode = mode;
//         fixture.detectChanges();
//         const buttons = fixture.debugElement.queryAll(By.directive(PreviewModeButtonComponent));
//         const selectedButtons = buttons.filter(x => x.componentInstance.selected);
//         const selectedButton = <PreviewModeButtonComponent>selectedButtons[0].componentInstance;

//         expect(selectedButtons.length).toEqual(1);
//         expect(selectedButton.type).toEqual(mode);
//     });

//     xit('should dispatch the PreviewReady action when preview loaded', () => {
//         // fixture.componentInstance.previewLoaded();
//         expect(store.dispatch).toHaveBeenCalled();
//         expect(store.dispatch).toHaveBeenCalledTimes(1);
//         expect(store.dispatch.calls.argsFor(0)[0] instanceof rootActions.PreviewReady).toBeTruthy();
//     });

//     it('should set correct preview class when mode button clicked', () => {
//         fixture.componentInstance.mode = 'mobile';

//         fixture.detectChanges();

//         const buttons = fixture.debugElement.queryAll(By.directive(PreviewModeButtonComponent));
//         (<PreviewModeButtonComponent>buttons[1].componentInstance).onButtonClick();

//         fixture.detectChanges();

//         const desktopElements = fixture.debugElement.queryAll(By.css('.desktop'));
//         const mobileElements = fixture.debugElement.queryAll(By.css('.mobile'));
//         const tabletElements = fixture.debugElement.queryAll(By.css('.tablet'));

//         expect(fixture.componentInstance.mode).toEqual('tablet');

//         expect(mobileElements.length).toEqual(0);
//         expect(desktopElements.length).toEqual(0);
//         expect(tabletElements.length).toEqual(1);
//     });

//     it('should toggle preview container class fullscreen when correspond button clicked', () => {
//         fixture.detectChanges();
//         const toggler = fixture.debugElement.query(By.css('.theme-toggle'));

//         toggler.triggerEventHandler('click', { });
//         fixture.detectChanges();

//         let fullscreenObj = fixture.debugElement.query(By.css('.fullscreen'));
//         expect(fullscreenObj).not.toBeNull();

//         toggler.triggerEventHandler('click', { });
//         fixture.detectChanges();

//         fullscreenObj = fixture.debugElement.query(By.css('.fullscreen'));
//         expect(fullscreenObj).toBeNull();
//     });
// });
