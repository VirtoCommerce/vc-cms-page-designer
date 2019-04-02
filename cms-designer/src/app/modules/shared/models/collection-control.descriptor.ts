import { BaseControlDescriptor, ControlDescriptor } from '.';

export interface CollectionControlDescriptor extends BaseControlDescriptor {
    addText?: string;
    removeText?: string;
    displayField?: string;
    element: ControlDescriptor[];
    _index?: number;
}
