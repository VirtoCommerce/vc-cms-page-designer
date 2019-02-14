import { OnInit, Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'app-history-walker',
    templateUrl: './history-walker.component.html'
})
export class HistoryWalkerComponent implements OnInit {
    @Input() hasUndo = false;
    @Input() hasRedo = false;

    @Output() undoClicked = new EventEmitter<any>();
    @Output() redoClicked = new EventEmitter<any>();

    ngOnInit(): void { }

    onUndoClicked() {
        this.undoClicked.emit();
    }

    onRedoClicked() {
        this.redoClicked.emit();
    }
}
