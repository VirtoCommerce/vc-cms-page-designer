import { Injectable } from '@angular/core';
import { BlockValuesModel } from '@shared/models';

@Injectable()
export class MockPreviewService {
    add(_block: BlockValuesModel, _frameId: string) { }
    update(_block: BlockValuesModel, _frameId: string) { }
    cloneBlock(_source: number, _destination: number, _frameId: string) { }
    hide(_block: BlockValuesModel, _frameId: string) { }
    show(_block: BlockValuesModel, _frameId: string) { }
    removeBlock(_block: BlockValuesModel, _frameId: string) { }
    preview(_block: BlockValuesModel, _frameId: string) { }
    changeOrder(_currentIndex: number, _newIndex: number, _frameId: string) { }
    page(_page: BlockValuesModel[], _frameId: string) { }
    reload(_frameId: string) { }
    selectBlock(_blockId: number, _frameId: string) { }
    hover(_block: BlockValuesModel, _frameId: string) { }
    toggleFrames(_primaryId: string, _secondaryId: string) { }
}
