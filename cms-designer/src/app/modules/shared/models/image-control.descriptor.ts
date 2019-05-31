import { BaseControlDescriptor } from '.';

export interface ImageControlDescriptor extends BaseControlDescriptor {
    previewWidth?: number;
    previewHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowSetSize?: boolean;
    acceptTypes?: string;
}
