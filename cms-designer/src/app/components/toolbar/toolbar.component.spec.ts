import { ToolbarButtonComponent } from './toolbar-button/toolbar-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { By } from '@angular/platform-browser';

describe('ToolbarComponent', () => {
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarComponent, ToolbarButtonComponent]
        });

        fixture = TestBed.createComponent(ToolbarComponent);
    });

    it ('should execute closeEditor when click on Back button', (done) => {
        fixture.componentInstance.closeEditor = () => {
            expect(true).toBe(true);
            done();
        };

        const el = fixture.debugElement.query(By.directive(ToolbarButtonComponent));
        (<ToolbarButtonComponent>el.componentInstance).buttonClick.emit();

    });
});
