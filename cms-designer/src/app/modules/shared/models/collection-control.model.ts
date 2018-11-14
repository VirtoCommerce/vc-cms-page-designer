import { BaseControlModel } from '.';

export interface CollectionControlModel extends BaseControlModel {
    addText?: string;
    removeText?: string;
    displayField?: string;
    element: BaseControlModel[];
}
