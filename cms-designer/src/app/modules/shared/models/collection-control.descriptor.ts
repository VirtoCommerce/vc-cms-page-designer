import { BaseControlDescriptor } from '.';

export interface CollectionControlDescriptor extends BaseControlDescriptor {
    addText?: string;
    removeText?: string;
    displayField?: string;
    element: BaseControlDescriptor[];
}
