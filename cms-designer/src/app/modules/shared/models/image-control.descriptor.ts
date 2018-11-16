import { BaseControlDescriptor } from '.';

export interface ImageControlDescriptor extends BaseControlDescriptor {
    type: 'image';
    previewWidth?: number;
    previewHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}
