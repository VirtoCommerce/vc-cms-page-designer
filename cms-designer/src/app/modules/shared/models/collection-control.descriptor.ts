import { BaseControlDescriptor, ControlDescriptor } from '.';

export interface CollectionControlDescriptor extends BaseControlDescriptor {
    type: 'collection';
    addText?: string;
    removeText?: string;
    displayField?: string;
    element: ControlDescriptor[];
}
