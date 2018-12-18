import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';
import { SafeUrl, DomSanitizer, By } from '@angular/platform-browser';
import { ApiUrlsService } from './services/api-url.service';
import { Store } from '@ngrx/store';

@Component({ selector: 'app-toolbar', template: '' })
class ToolbarStubComponent { }

@Component({ selector: 'app-sidebar', template: '' })
class SidebarStubComponent { }

@Component({ selector: 'app-preview', template: '' })
class PreviewStubComponent {
    @Input() loading: true;
    @Input() storeUrl: SafeUrl;
}

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let mockStore;
    let mockUrls: any;

    beforeEach(() => {
        mockUrls = jasmine.createSpyObj(['getStoreUrl']);
        mockStore = jasmine.createSpyObj(['subscribe']);
        mockStore.pipe = jasmine.createSpy().and.returnValue(mockStore);
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ToolbarStubComponent,
                SidebarStubComponent,
                PreviewStubComponent
            ],
            providers: [
                { provide: ApiUrlsService, useValue: mockUrls },
                { provide: Store, useValue: mockStore }
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it('should create the app', () => {
        const component = fixture.componentInstance;
        expect(component).not.toBeNull();
    });

    xit('should get safe store url and pass it to preview', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
        const url = 'http://localhost/';
        const safeUrl = sanitizer.bypassSecurityTrustUrl(url);

        mockUrls.getStoreUrl.and.returnValue(safeUrl);

        fixture.detectChanges();

        const preview = fixture.debugElement.query(By.directive(PreviewStubComponent));

        expect(preview.componentInstance.storeUrl).toEqual(safeUrl);

    }));

});
