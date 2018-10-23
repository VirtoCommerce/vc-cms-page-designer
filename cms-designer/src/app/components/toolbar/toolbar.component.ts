import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    closeEditor() {
        // todo: need to check the changes
        if (window.opener && !window.opener.closed) {
            window.opener.focus();
            window.close();
        } else {
            window.stop();
            window.location.href = `${environment.platformUrl}#/workspace/content`;
        }
    }
}
