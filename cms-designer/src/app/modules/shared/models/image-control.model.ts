import { BaseControlModel } from '.';

export interface ImageControlModel extends BaseControlModel {
    previewWidth?: number;
    previewHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}
